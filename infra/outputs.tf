output "user_api_name" {
  value     = aws_iam_user.api.name
  sensitive = false
}

output "user_api_iam_key" {
  value     = aws_iam_access_key.api.id
  sensitive = true
}

output "user_api_iam_secret" {
  value     = aws_iam_access_key.api.secret
  sensitive = true
}
