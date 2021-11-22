import { buildTheme, ITheme } from '@kibalabs/ui-react';

export const buildAppTheme = (): ITheme => {
  const theme = buildTheme({
    colors: {
      brandPrimary: '#1C92D2',
      brandSecondary: '#36D1DC',
      background: '#000000',
      text: '#ffffff',
    },
    fonts: {
      main: {
        url: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap',
      },
    },
    texts: {
      default: {
        'font-family': "'Roboto Condensed', sans-serif",
        'font-weight': '400',
      },
      note: {
        color: '$colors.textClear50',
      },
    },
    iconButtons: {
      default: {
        normal: {
          default: {
            background: {
              'border-width': '1px',
              'border-color': 'rgba(255, 255, 255, 0.7)',
              'background-color': 'rgba(255, 255, 255, 0.2)',
            },
          },
          hover: {
            background: {
              'border-color': 'rgba(255, 255, 255, 0.8)',
            },
          },
          press: {
            background: {
              'border-color': 'rgba(255, 255, 255, 0.9)',
            },
          },
          focus: {
            background: {
              'border-color': 'rgba(255, 255, 255, 1)',
            },
          },
        },
        disabled: {
          default: {
            background: {
              'border-width': '1px',
              'border-color': 'rgba(255, 255, 255, 0.2)',
              'background-color': 'rgba(255, 255, 255, 0.1)',
            },
            text: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
      },
    },
    inputWrappers: {
      default: {
        normal: {
          default: {
            background: {
              'border-width': '1px',
              'border-color': 'rgba(255, 255, 255, 0.7)',
              'background-color': 'rgba(255, 255, 255, 0.2)',
            },
            placeholderText: {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
          hover: {
            background: {
              'border-width': '1px',
              'border-color': 'rgba(255, 255, 255, 0.8)',
              'background-color': 'rgba(255, 255, 255, 0.2)',
            },
          },
          focus: {
            background: {
              'border-width': '1px',
              'border-color': 'rgba(255, 255, 255, 1)',
              'background-color': 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
      },
    },
  });

  return theme;
};
