pipeline {
    agent any

    stages {
        stage('SCM Frontend') {
            steps {
                git 'https://github.com/SandeshHD/proctorx-backend.git'
            }
        }
        stage('Add Env'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'db-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                def envString = "DB_HOST=proctorx-db.c5mesm46eyzl.us-east-1.rds.amazonaws.com\n"
                envString += "DB_USER=$USERNAME\n"
                envString += "DB_PASSWORD=$PASSWORD\n"
                envString += "DB_NAME=proctorx\n"
                envString += "DB_PORT=3306\n"
                envString += "DB_CONNECTION_LIMIT=10\n"
                envString += "SERVER_PORT=3005\n"
                sh "echo -e '$envString' > .env"
            }
        }
        }
        stage('Frontend Docker Build'){
            steps{
                sh 'docker compose build'
            }
        }
        stage('Docker Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', '6d743854-7905-4899-8780-166d97090755') {
                        docker.image('sandeshhd/proctorx-backend:latest').push()
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            steps{
                script{
                    def scannerHome = tool 'sonar';
                    withSonarQubeEnv('sonarBackend') {
                      sh "${scannerHome}/bin/sonar-scanner"
                    }
                    
                }
            }
        }
        stage('Kubernetes Start'){
            steps{
                script{
                    sh 'kubectl apply -f deployment.yml --validate=false'
                    sh 'kubectl apply -f services.yml --validate=false'
                    sh 'kubectl get services'
                }
            }
        }
    }
}
