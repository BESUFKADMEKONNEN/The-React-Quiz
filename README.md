# Quiz App

This is a simple React application that allows users to choose between answers. It runs serverless with a JSON server as a backend.

## Features
- Multiple-choice answer selection
- JSON Server as a local backend
- No authentication or user management

## Live Repository
### [GitHub Repository](your-repo-link-here)

## Installation
To get started with the Quiz App, follow these steps:

### 1. Clone the repository:
```bash
git clone your-repo-link-here
```

### 2. Navigate to the project directory:
```bash
cd quiz-app
```

### 3. Install dependencies:
Make sure you have Node.js installed. Then, run:
```bash
npm install
```

### 4. Start JSON Server
To run the local backend, use:
```bash
npm run server
```
**This will start JSON Server on `http://localhost:5000`.**

### 5. Start the React App
To run the frontend, use:
```bash
npm start
```
**This will start the React app on `http://localhost:3000`.**

## JSON Server Configuration
The JSON server uses `db.json` as the mock backend. You can edit `db.json` to modify questions and answers.

Example `db.json`:
```json
{
  "questions": [
    {
      "id": 1,
      "question": "What is the capital of France?",
      "options": ["Berlin", "Madrid", "Paris", "Rome"],
      "answer": "Paris"
    }
  ]
}
```

## License
This project is licensed under the ISC License.

## Author
**Besufkad Mekonnen**

