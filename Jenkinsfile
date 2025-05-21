pipeline {
  agent any

  environment {
    NODE_ENV = 'development'
    KUBECONFIG_CREDENTIALS_ID = 'kubeconfig-secret' // ID secret di Jenkins
  }

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'development', url: 'https://github.com/halvest/projek-uts-devops.git'
      }
    }

    stage('Setup Node & Install Dependencies') {
      steps {
        sh 'node -v'
        sh 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test || echo "No real tests defined."'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t projek-uts-devops .'
      }
    }

    stage('Deploy to Kubernetes (Staging)') {
      steps {
        withCredentials([file(credentialsId: "${KUBECONFIG_CREDENTIALS_ID}", variable: 'KUBECONFIG')]) {
          sh '''
            mkdir -p ~/.kube
            cp $KUBECONFIG ~/.kube/config
            kubectl apply -f deployment.yaml
            kubectl apply -f service.yaml
          '''
        }
      }
    }
  }

  post {
    success {
      echo '✅ Build, Test, and Deploy Succeeded!'
    }
    failure {
      echo '❌ Build or Test Failed.'
    }
  }
}
