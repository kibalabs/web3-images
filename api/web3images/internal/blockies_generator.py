# NOTE(krishan711): mostly copied from
# https://github.com/ethereum/blockies
# https://github.com/konradkonrad/blockies-py

import colorsys
import ctypes
import math
from typing import List

from PIL import Image
from PIL import ImageDraw
from svgwrite import Drawing as SvgDrawing


def int32(num):
    return ctypes.c_int32(num).value


def triple_shift(num):
    """Emulate js `num >>> 0` behaviour"""
    return int(hex(num & 0xFFFFFFFF), 16)


class XORshiftPRNG:
    """The random number is a port of the js implementation
    of the Xorshift PRNG"""
    def __init__(self, seed):
        # Xorshift: [x, y, z, w] 32 bit values
        self.randseed = [int32(0)] * 4
        self.seedrand(seed)

    def seedrand(self, seed):
        for index, _ in enumerate(seed):
            self.randseed[index % 4] = int32(self.randseed[index % 4] << 5) - self.randseed[index % 4] + ord(seed[index])

    def rand(self):
        # based on Java's String.hashCode(), expanded to 4 32bit values
        value = int32(self.randseed[0] ^ (self.randseed[0] << 11))
        self.randseed[0] = self.randseed[1]
        self.randseed[1] = self.randseed[2]
        self.randseed[2] = self.randseed[3]
        self.randseed[3] = int32(self.randseed[3] ^ (int32(self.randseed[3]) >> 19) ^ value ^ (value >> 8))
        result = int32(triple_shift(self.randseed[3])) / triple_shift((1 << 31))
        return result

# def sanity_check():
#     # Sanity check (test that RNG has same result as js version)
#     first_rand = 0.2292061443440616
#     seed = '0xfadc801b8b7ff0030f36ba700359d30bb12786e4'
#     test = XORshiftPRNG(seed)
#     assert test.rand() == first_rand

# sanity_check()


class Color:

    def __init__(self, hue, light, saturation):
        self.hue = hue
        self.saturation = saturation
        self.light = light

    @staticmethod
    def create_color(prng):
        # saturation is the whole color spectrum
        hue = prng.rand()
        # saturation goes from 40 to 100, it avoids greyish colors
        saturation = ((prng.rand() * .6) + .4)
        # lightness can be anything from 0 to 100, but probabilities are a
        # bell curve around 50%
        light = ((prng.rand() + prng.rand() + prng.rand() + prng.rand()) * .25)
        return Color(hue, light, saturation)

    @property
    def numericRgb(self):
        return tuple(map(lambda c: math.floor(c * 256), colorsys.hls_to_rgb(*self.hls)))

    @property
    def hexRgb(self):
        return ''.join('{:02x}'.format(math.floor(c * 256)) for c in self.numericRgb)  # pylint: disable=consider-using-f-string

    @property
    def hls(self):
        return (self.hue, self.light, self.saturation)


class BlockiesGenerator:
    _BLOCK_COUNT = 8

    def get_image_data(self, prng: XORshiftPRNG) -> List[int]:
        dataWidth = math.ceil(self._BLOCK_COUNT / 2)
        mirrorWidth = self._BLOCK_COUNT - dataWidth
        imageData = []
        for _ in range(self._BLOCK_COUNT):
            # this makes foreground and background color to have a 43% (1/2.3) probability, spot color has 13% chance
            row = [math.floor(prng.rand() * 2.3) for _ in range(dataWidth)]
            rowPart = row[0: mirrorWidth]
            rowPart.reverse()
            row.extend(rowPart)
            imageData += row
        return imageData

    def create_png_for_eth_address(self, address: str) -> Image:
        imageSize = 1000
        blockSize = imageSize / self._BLOCK_COUNT
        address = address.lower()
        prng = XORshiftPRNG(address)
        color = Color.create_color(prng)
        bgcolor = Color.create_color(prng)
        spotcolor = Color.create_color(prng)
        imageData = self.get_image_data(prng=prng)
        image = Image.new('RGBA', (imageSize, imageSize), bgcolor.numericRgb)
        imageDraw = ImageDraw.Draw(image)
        for index, value in enumerate(imageData):
            if value == 0:
                continue
            row = math.floor(index / self._BLOCK_COUNT)
            col = index % self._BLOCK_COUNT
            imageDraw.rectangle(((col * blockSize, row * blockSize), ((col + 1) * blockSize, (row + 1) * blockSize)), fill=color.numericRgb if value == 1 else spotcolor.numericRgb)
        return image

    def create_svg_for_eth_address(self, address: str) -> str:
        imageSize = 1000
        blockSize = imageSize / self._BLOCK_COUNT
        address = address.lower()
        prng = XORshiftPRNG(address)
        color = Color.create_color(prng)
        bgcolor = Color.create_color(prng)
        spotcolor = Color.create_color(prng)
        imageData = self.get_image_data(prng=prng)
        dwg = SvgDrawing(profile='tiny', size=(imageSize, imageSize))
        dwg.add(dwg.rect(insert=(0, 0), size=(imageSize, imageSize), fill=f'rgb{bgcolor.numericRgb}'))
        for index, value in enumerate(imageData):
            if value == 0:
                continue
            row = math.floor(index / self._BLOCK_COUNT)
            col = index % self._BLOCK_COUNT
            dwg.add(dwg.rect(insert=(col * blockSize, row * blockSize), size=(blockSize, blockSize), fill=f'rgb{color.numericRgb}' if value == 1 else f'rgb{spotcolor.numericRgb}'))
        return dwg.tostring()
