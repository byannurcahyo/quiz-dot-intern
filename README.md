# Yanswer

Yanswer adalah aplikasi web sederhana yang merupakan challenge yang diberikan oleh DOT Indonesia sebagai tes persyaratan magang. Aplikasi ini berguna untuk mengetes pengetahuan dan menantang diri dengan soal-soal yang menarik.

## Features

-   Register
-   Login
-   Quiz
-   Quiz Result

## Demo

Check out the live demo: [Demo](https://yanswer.pages.dev/)

## Tech Stack

**Client:** React, Typescript, TailwindCSS

**Server:** Firebase

## API References

[Quiz API](https://opentdb.com/)

## Instalation

Clone the project

```bash
  git clone https://github.com/byannurcahyo/quiz-dot-intern.git
```

Go to the project directory

```bash
  cd quiz-dot-intern
```

Install dependencies

```bash
  bun install
```

Create .env

```bash
  cp .env.example .env
```

Add your API and Firebase Configuration

```bash
VITE_API_URL="your_quiz_api"

VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
VITE_FIREBASE_PROJECT_ID="your_firebase_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender"
VITE_FIREBASE_APP_ID="your_firebase_app_id"
```

Start the server

```bash
  bun dev
```

## Screenshots

1. Landing Page

![Landing Page](/src/assets/screenshots/landing.png)

2. Register Page

![Login Page](/src/assets/screenshots/register.png)

3. Login Page

![Login Page](/src/assets/screenshots/login.png)

4. Home Page

![Home Page](/src/assets/screenshots/home.png)

5. Quiz Page

![Quiz Page](/src/assets/screenshots/quiz.png)

6. Result Page

![Result Page](/src/assets/screenshots/result.png)

7. Error Page

![Error Page](/src/assets/screenshots/error.png)
