resource "aws_iam_group" "users" {
  name = "${local.project}-users"
}

resource "aws_iam_user" "api" {
  name = "${local.project}-api"
  tags = {
    app = "notd"
  }
}

resource "aws_iam_access_key" "api" {
  user = aws_iam_user.api.name
}

resource "aws_iam_user_group_membership" "api" {
  user = aws_iam_user.api.name

  groups = [
    aws_iam_group.users.name,
  ]
}

resource "aws_iam_group_policy_attachment" "users_access_ethereum_node" {
  group = aws_iam_group.users.name
  policy_arn = aws_iam_policy.access_ethereum_node.arn
}

resource "aws_iam_group_policy_attachment" "users_write_to_storage" {
  group = aws_iam_group.users.name
  policy_arn = aws_iam_policy.write_to_storage.arn
}
