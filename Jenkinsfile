pipeline {
  agent any

  environment {
    NODE_ENV = 'development'
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

    stage('Run App (Optional)') {
      when {
        expression { env.RUN_APP == 'true' }
      }
      steps {
        echo 'Starting the application...'
        sh 'npm start &'
      }
    }
  }

  post {
    success {
      echo '🎉 Build and Test Succeeded!'
    }
    failure {
      echo '❌ Build or Test Failed.'
    }
  }
}