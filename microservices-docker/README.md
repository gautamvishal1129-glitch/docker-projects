🛠️ Microservices App with Docker Compose

This is a microservices-based application with Node.js (User Service), Python Flask (Product Service), MongoDB, and Redis running inside Docker containers.
The project is fully containerized using Docker Compose for easy setup and deployment.


🚀 Features

* User Service (Node.js): Signup/Login with MongoDB & Redis session management

* Product Service (Flask): Add & list products stored in MongoDB

* MongoDB database with persistent storage

* Redis cache for session handling

* Environment variables stored in .env

* Fully containerized with Docker & Docker Compose

* Easy one-command setup



🛠️ Tech Stack

* Backend: Node.js (User Service), Python Flask (Product Service)

* Database: MongoDB

* Cache: Redis

* Containerization: Docker & Docker Compose


## 📸 Screenshots

### 1. Project File Structure
![Project File Structure](screenshots/project_structure.png)

### 2. Docker Build
![Docker Build](screenshots/docker_build.png)

### 3. Running Containers
![Running Containers](screenshots/containers_list.png)

### 4. MongoDb Connection
![MongoDb Connection](screenshots/mongodb_connection.png)

### 5. Redis Running
![Docker Desktop](screenshots/redis_running.png)

### 6. Docker Desktop
![Docker Desktop](screenshots/docker_desktop.png)

### 7. User Created
![User Created](screenshots/user_created.png)

### 8. User Login
![User Login](screenshots/user_login.png)

### 9. Session Details
![Session Details](screenshots/session_details.png)

### 10. Add Product
![Add Product](screenshots/add_product.png)

### 11. List Products
![List Products](screenshots/list_products.png)


🛠️ Setup Instructions

1️⃣ Clone the repository

    git clone https://github.com/gautamvishal1129-glitch/docker-projects.git
    cd microservices-docker

2️⃣ Copy .env.example → .env and update values if needed

    cp .env.example .env

3️⃣ Build and run containers

    docker compose up -d --build

4️⃣ Access the services

    User Service 👉 http://localhost:4000

    Product Service 👉 http://localhost:5000

5️⃣ Test endpoints using Postman

    Signup: POST http://localhost:4000/signup

    Login: POST http://localhost:4000/login

    Get Products: GET http://localhost:5000/products

    Add Product: POST http://localhost:5000/products

🔧 Useful Docker Commands

    Stop containers:

        docker compose down


    View logs:

        docker compose logs -f


    List volumes:

        docker volume ls