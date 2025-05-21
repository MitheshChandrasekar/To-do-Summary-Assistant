# Todo Summary Assistant

A full-stack application where users can create and manage personal to-do items, generate AI-powered summaries, and send them to Slack.

## Features

- Create, edit, and delete todo items
- Mark todos as complete/incomplete
- Generate AI summaries of pending todos using LLM integration
- Send summaries to a Slack channel via webhooks

## Tech Stack

### Frontend
- React
- Axios for API requests
- React Toastify for notifications
- React Icons for UI elements

### Backend
- Node.js with Express
- Supabase for database
- Cohere for LLM integration
- Slack webhooks for messaging

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Supabase account
- Cohere key
- Slack workspace with incoming webhook configuration

### Backend Setup

1. Clone the repository
```
git clone https://github.com/your-username/todo-summary-assistant.git
cd todo-summary-assistant/backend
```

2. Install dependencies
```
npm install
```  

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
Cohere_KEY=your_openai_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

4. Set up Supabase database:
   - Create a new project in Supabase
   - Create a `todos` table with the following schema:
   ```sql
   Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_todos_updated_at
BEFORE UPDATE ON todos
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
   ```

5. Start the backend server:

1. Navigate to the backend directory:
```
cd ../backend
```

2. Install dependencies:
```
npm install
```

3. Start the backend development server:
```
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```
cd ../frontend
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the frontend development server:
```
npm start
```

## Slack Integration Setup

1. Go to your Slack workspace's App Directory (or create a new workspace if needed)
2. Click "Create New App" and choose "From scratch"
3. Name your app and select your workspace
4. In the app's settings, navigate to "Incoming Webhooks"
5. Toggle "Activate Incoming Webhooks" to On
6. Click "Add New Webhook to Workspace"
7. Choose the channel where you want the summaries to be posted
8. Copy the webhook URL and add it to your backend `.env` file as `SLACK_WEBHOOK_URL`

## OpenAI Integration

1. Create an account on [OpenAI's platform](https://platform.openai.com/)
2. Navigate to the API keys section
3. Create a new API key
4. Copy the API key and add it to your backend `.env` file as `OPENAI_API_KEY`


## Cohere Integration
1. Create an account on Cohere's platform, https://cohere.ai/ 

2. Navigate to the API Keys section in your dashboard

3. Create a new API key

4. Copy the API key and add it to your backend .env file as COHERE_API_KEY


## Design Decisions

- **State Management**: Used React's useState and useEffect hooks for managing component state and side effects. For a larger application, more sophisticated state management like Redux or Context API would be considered.

- **API Structure**: Separated APIs into distinct controllers and routes for better organization and maintainability.

- **Database**: Used Supabase for its simplicity and PostgreSQL compatibility, along with its free tier for development.

- **Error Handling**: Implemented comprehensive error handling throughout the application with helpful user feedback via toast notifications.

- **UX Considerations**: 
  - Separated todos into "Pending" and "Completed" sections for better organization
  - Added visual cues for completed todos
  - Implemented loading states for async operations
  - Provided feedback for successful/failed operations
  - Used intuitive UI elements for common actions

## Deployment (Optional)

### Backend
- Supabase can host both the database and backend if desired.
- Alternatively, the Node.js backend can be deployed to services like Heroku, Railway, or Render.

### Frontend
- The React frontend can be deployed to platforms like Vercel, Netlify, or Firebase Hosting.

## Future Enhancements

- Add user authentication
- Implement todo categories/tags
- Add due dates and reminders
- Create more advanced summarization options
- Implement sorting and filtering options for todos
