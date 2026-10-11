variable "image_tag" {
  description = "Docker image tag to deploy"
  type        = string
  default     = "latest"
}
variable "docker_host" {
  description = "Docker connection used by Terraform"
  type        = string
  default     = "ssh://karthi@192.168.29.116:22"
}
variable "external_port" {
  description = "Port used to open the test site"
  type        = number
  default     = 8092
}
terraform {
  backend "local" {}
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "4.6.0"
    }
  }
}

provider "docker" {
  host = var.docker_host
}

resource "docker_image" "portfolio_test" {
  name = "karthi271/devops-portfolio:${var.image_tag}"
}

resource "docker_container" "portfolio_test" {
  name  = "portfolio-terraform-test"
  image = docker_image.portfolio_test.image_id

  ports {
    internal = 80
    external = var.external_port
  }

  restart = "unless-stopped"
}

output "portfolio_test_url" {
  value = "http://192.168.29.116:8092"
}