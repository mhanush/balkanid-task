# Task Management System

The Task Management System is a comprehensive and containerized solution that empowers organizations to efficiently manage tasks, projects, and user access. It includes user authentication, authorization, and access management features.

## Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Golang with the Fiber framework
- **Authentication:** JWT and Cookies
- **Database:** AWS Cloud MySQL
- **Containerization:** Docker
- **Deployment:** AWS EC2 instance

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Authentication](#authentication)
4. [Database](#database)
5. [Containerization](#containerization)
6. [Deployment](#deployment)
7. [Access Management](#access-management)

## Installation

### Prerequisites

- Node.js and npm for the frontend
- Golang for the backend
- Docker for containerization
- AWS account for database and EC2 deployment

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Change directory to the frontend:
    ```bash
    cd my-project
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the frontend:
    ```bash
    npm start
    ```

### Backend Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Change directory to the backend:
    ```bash
    cd backend
    ```
3. Install dependencies:
    ```bash
    go get
    ```
4. Start the backend:
    ```bash
    go run main.go
    ```

## Usage

### User Registration

To register a new user, go to the registration page and fill out the form.

### Authentication

Use the login page to authenticate with your credentials. Upon successful login, a JWT token will be stored in a cookie for subsequent requests.

### Creating Projects

Authenticated users can create new projects via the project creation page.

### Viewing Projects

Authenticated users can view their projects on the project view page.

### Deleting Account

To delete your account, navigate to the account settings and follow the prompts.

### Logging Out

Log out by visiting the logout page.

## Database

This system uses AWS Cloud MySQL for data storage.

## Containerization

The project is containerized for easier deployment. Docker containers for both the frontend and backend have been provided.

### Building and Running Containers

To build and run the containers, follow the instructions in the Dockerfile and docker-compose.yml files.

1. Build the Docker images:
    ```bash
    docker-compose build
    ```
2. Run the Docker containers:
    ```bash
    docker-compose up
    ```

## Deployment

### AWS EC2 Setup

1. Create an AWS EC2 instance.
2. Install Docker on the EC2 instance.
3. Build Docker images for both frontend and backend on the EC2 instance with image names "frontend" and "backend".
4. Deploy the Docker containers on the EC2 instance.

**Public DNS:** `ec2-13-127-80-255.ap-south-1.compute.amazonaws.com`

**Public IPv4 Address:** `13.127.80.255`

## Access Management

Role-based and group-based access management is implemented.

- **Managers** can assign tasks to employees.
- **Employees** can only view tasks.
- Managers cannot assign tasks to other managers.
- Employees cannot create tasks.

---

For more details on each section, please refer to the documentation provided in the repository.
