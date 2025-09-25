# 🚀 React + Nginx Multi-Stage Docker Project

This project demonstrates how to containerize a **React frontend application** using a **multi-stage Docker build**.  
We use **Node.js** to build the React app and **Nginx** to serve the optimized static files, making the final image lightweight and production-ready.  

---

## ✨ Features
- Multi-stage Docker build (smaller final image size)  
- React app built with Node.js (build stage)  
- Static files served via Nginx (production stage)  
- App runs on **http://localhost:8081**  

---

## 🛠️ Tech Stack
- **Frontend:** React.js  
- **Build Tool:** Node.js  
- **Server:** Nginx  
- **Containerization:** Docker  

---

## 📸 Screenshots

### 1. Project File Structure
![Project Structure](screenshots/folder_structure.png)

### 2. Docker Build
![Docker Build](screenshots/docker_build.png)

### 3. Running Container
![Running Container](screenshots/docker_container.png)

### 4. Browser – React App
![React App](screenshots/browser_app.png)

### 5. Docker Desktop
![Docker Desktop](screenshots/docker_desktop.png)

---

## 🏗️ How to Build and Run

1. **Clone the repository**  
   ```bash
   git clone https://github.com/gautamvishal1129-glitch/docker-projects.git
   cd docker-projects/react-docker

2. Build the image

    docker build -t react-nginx-app .


3. Run the container

    docker run -d -p 8081:80 react-nginx-app


4. Access the app in browser

    👉 http://localhost:8081

* Stop container

    docker stop <container_id>


* Remove container

    docker rm <container_id>


* View logs

    docker logs -f <container_id>


* List images

    docker images