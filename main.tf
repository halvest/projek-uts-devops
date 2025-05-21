terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.2"
    }
  }
}

provider "docker" {}

resource "docker_image" "login_image" {
  name = "projek-uts-devops"
  build {
    context    = "./"
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "login_container" {
  name  = "uts-login"
  image = docker_image.login_image.name
  ports {
    internal = 3000
    external = 3001
  }
}
