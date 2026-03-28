# Task Manager Application (Spring Boot + React + Docker + CI/CD)

A full-stack task management system built using Spring Boot, React, and MySQL. The application includes JWT-based authentication, role-based access control, and a fully containerized setup with Docker and CI/CD using GitHub Actions.

---

## Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Security (JWT authentication)
* Spring Data JPA (Hibernate)
* MySQL 8
* Maven

### Frontend

* React (Create React App)
* Axios
* React Router DOM

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* Docker Hub

---

## Features

### Authentication

* User registration and login
* JWT-based authentication
* Password encryption using BCrypt

### Role-Based Access

#### Admin

* View all users
* Create users
* Create, update, and delete tasks
* Assign tasks to users

#### User

* View assigned tasks
* Update task status (TODO, IN_PROGRESS, DONE)

---

### Task Management

* Create, update, and delete tasks
* Assign tasks to users
* Filter tasks by status and assigned user
* Track createdBy and assignedTo fields

---

## Project Structure

```
TaskM/
│
├── .github/
│   └── workflows/
│       └── docker.yml
│
├── Task.Manager/
│   └── Task.Manager/
│       ├── src/
│       │   ├── controller/
│       │   ├── service/
│       │   ├── repository/
│       │   ├── entity/
│       │   ├── security/
│       │   └── config/
│       ├── Dockerfile
│       ├── pom.xml
│       └── mvnw
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## Setup Instructions

### Clone the Repository

```
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

---

### Run with Docker

```
docker-compose up --build
```

---

### Application Access

* Frontend: http://localhost:3000
* Backend: http://localhost:8080

---

## Docker Configuration

### Backend Dockerfile

```
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

### Frontend Dockerfile

```
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

---

### docker-compose.yml

```
services:

  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: taskdb
    ports:
      - "3307:3306"

  backend:
    build: ./Task.Manager/Task.Manager
    ports:
      - "8080:8080"
    depends_on:
      - mysql

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

---

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

---

### Tasks

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/tasks      |
| POST   | /api/tasks      |
| PUT    | /api/tasks/{id} |
| DELETE | /api/tasks/{id} |

---

### Users

| Method | Endpoint   |
| ------ | ---------- |
| GET    | /api/users |

---

## CI/CD Pipeline

GitHub Actions is configured to:

* Build the backend JAR using Maven
* Build Docker images for backend and frontend
* Push images to Docker Hub

Workflow file location:

```
.github/workflows/docker.yml
```

---

## Security

* JWT-based authentication
* Role-based authorization
* Password hashing using BCrypt

---

## Notes

* MySQL runs inside a Docker container
* Data persists using Docker volumes
* Backend connects to MySQL using:

```
jdbc:mysql://mysql:3306/taskdb
```

---

## Author

Padmanabha Sengupta

---

## Summary

* Full-stack application with Spring Boot and React
* Containerized using Docker
* Automated CI/CD pipeline using GitHub Actions
* Suitable for demonstration, learning, and deployment
