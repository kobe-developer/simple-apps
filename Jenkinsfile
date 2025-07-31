pipeline {
     agent { label 'dev-andri' }

     stages {
          stage('Pull SCM') {
               steps {
                    git branch: 'main', url: 'https://github.com/kobe-developer/simple-apps.git'
               }
          }

          stage('Build') {
               steps {
                    sh'''
                    cd app
                    npm install
                    '''
               }
          }

          stage('Testing') {
               steps {
                    sh'''
                    cd app
                    npm test
                    npm run test:coverage
                    '''
               }
          }

          stage('Code Review') {
               steps {
                    sh'''
                    cd app
                    sonar-scanner \
                    -Dsonar.projectKey=simple-app \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://172.23.8.127:9000 \
                    -Dsonar.login=sqp_d5c45e359a099e997f92d6d813b251e118d8ea16
                    '''
               }
          }

          stage('Deploy') {
               steps {
                    sh'''
                    docker compose up -d --build
                    '''
               }
          }

          stage('Backup') {
               steps {
                    sh 'docker compose push'
               }
          }
     }
}