pipeline {
    agent any

    stages {
        stage('SCM Frontend') {
            steps {
                git branch: 'main', url: 'https://github.com/SandeshHD/proctorx-backend'
            }
        }
        stage('Add Env'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'db-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                script{
                    def envString = """
MYSQL_HOST=proctorx-db.c5mesm46eyzl.us-east-1.rds.amazonaws.com
MYSQL_USER=$USERNAME
MYSQL_PASSWORD=$PASSWORD
MYSQL_DATABASE=proctorx
DB_PORT=3306
PORT=3005"""
sh "echo '$envString' > .env"

                }
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
