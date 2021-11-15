resource "aws_iam_policy" "access_ethereum_node" {
  name = "access-ethereum-node-${local.project}"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
        Effect = "Allow"
        Action = [
            "managedblockchain:GET",
            "managedblockchain:POST"
        ]
        Resource = "arn:aws:managedblockchain:eu-west-1:097520841056:/"
    }]
  })
}

resource "aws_iam_policy" "write_to_storage" {
  name = "write-s3-${aws_s3_bucket.storage.bucket}"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:DeleteObject",
        "s3:DeleteObjectTagging",
        "s3:DeleteObjectVersion",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:PutObjectRetention",
        "s3:PutObjectTagging",
        "s3:PutObjectLegalHold"
      ],
      Resource = [
        aws_s3_bucket.storage.arn,
        "${aws_s3_bucket.storage.arn}/*",
      ]
    }]
  })
}
