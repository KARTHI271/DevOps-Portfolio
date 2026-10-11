pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')
    }

    stages {
        stage('Terraform Validate') {
    steps {
        sh 'terraform fmt -check'
        sh 'terraform init -input=false -backend-config="path=/var/lib/jenkins/terraform-state/terraform.tfstate"'
        sh 'terraform validate'
        }
    }
        stage('Terraform Plan Test') {
    steps {
        withEnv(['TF_VAR_docker_host=unix:///var/run/docker.sock']) {
            sh 'terraform plan -input=false -var="image_tag=latest" -var="external_port=8092"'
        }
          }
    }
        stage('Build') {
            steps {
                sh 'docker build -t karthi271/devops-portfolio:latest .'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-account',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_TOKEN'
                )]) {
                    sh 'echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh 'docker push karthi271/devops-portfolio:latest'
                    sh 'docker logout'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose -p devops-portfolio pull'
                sh 'docker compose -p devops-portfolio up -d'
            }
        }
    }
}
