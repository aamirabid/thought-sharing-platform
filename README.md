
# THOUGHT-SHARING-PLATFORM

The project is divided into 3 main parts:
- API documentation and high level database schema design.  
- Back-end Implementations
- Front-end Implementations

### MAIN BRANCH
Main branch contains the following deliverables:
- ERD (Entity Relationship Diagram)
- Postman Collection (API Documentation)
PS: Just clone this main branch to get the above deliverables.

### BACKEND BRANCH
Backend branch contains the following deliverables:
- Complete Implementation of backend requirement.
- REST API Architecture
- Modern PHP Framework (Laravel)

#### BACKEND SETUP
Requirements:
- PHP: ^8.1
- laravel: ^10.8
STEPS:
- Clone your project: (git clone https://github.com/aamirabid/thought-sharing-platform.git -b backend)
- Go to the folder application using cd command on your cmd or terminal
- Run composer install on your cmd or terminal
- Copy .env.example file to .env on the root folder. You can type copy .env.example .env if using command prompt Windows or cp .env.example .env if using terminal, Ubuntu
- Open your .env file and change the database name (DB_DATABASE) to whatever you have, username (DB_USERNAME) and password (DB_PASSWORD) field correspond to your configuration.
- Run php artisan key:generate
- Run php artisan migrate
- Run php artisan db:seed
- Run php artisan serve
- PS: In detail you can check out the branch readme.md for further reference.


### APP BRANCH
APP branch contains the following deliverables:
- Complete Implementation of app requirement.
- ANGULAR (TypeScript)
- Class Component with APIs integrations.
#### APP SETUP
Requirements:
- NODE: ^18.16.0
- ANGULAR: ^15.2.7
STEPS:
- Please make sure to setup and start backend before moving forward to the app side.
- Clone your project: (git clone https://github.com/aamirabid/thought-sharing-platform.git -b app)
- Go to the folder application using cd command on your cmd or terminal
- Run npm install -g @angular/cli
- Run npm install 
- Run npm run start
- PS: In detail you can check out the branch readme.md for further reference.


## IN A NUTSHELL
The approach is to go for the Requirements and the time frame, meanwhile choosing the architecture on the basis of front-end requirements, as we need to focus on SPA using Angular or React, and i have decided to move forward with angular. While backend i have design the system as per the REST principles using PHP modern framework LARAVEL.
