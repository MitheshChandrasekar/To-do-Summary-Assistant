const supabase = require('../config/db');
const axios = require('axios');
const OpenAI = require('openai');

// Initialize OpenAI
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Summarize todos using OpenAI
// const summarizeTodos = async (todos) => {
//   if (!todos || todos.length === 0) {
//     return "No pending todos to summarize.";
//   }

//   const pendingTodos = todos.filter(todo => !todo.completed);
  
//   if (pendingTodos.length === 0) {
//     return "All todos have been completed! Great job!";
//   }

//   // Format todos for the prompt
//   const todoList = pendingTodos.map(todo => `- ${todo.title}: ${todo.description || 'No description'}`).join('\n');
  
//   try {
//     const completion = await openai.chat.completions.create({
//       messages: [
//         { 
//           role: "system", 
//           content: "You are a helpful assistant that summarizes todo lists into concise, actionable summaries. Group similar tasks, identify priorities, and provide a brief overview." 
//         },
//         { 
//           role: "user", 
//           content: `Please summarize the following pending todos:\n${todoList}` 
//         }
//       ],
//       model: "gpt-3.5-turbo",
//     });

//     return completion.choices[0].message.content;
//   } catch (error) {
//     console.error('Error generating summary with OpenAI:', error);
//     throw new Error('Failed to generate summary');
//   }
// };
const { CohereClient } = require("cohere-ai");

// Initialize Cohere
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Summarize todos using Cohere
const summarizeTodos = async (todos) => {
  if (!todos || todos.length === 0) {
    return "No pending todos to summarize.";
  }

  const pendingTodos = todos.filter(todo => !todo.completed);

  if (pendingTodos.length === 0) {
    return "All todos have been completed! Great job!";
  }

  try {
    const response = await cohere.generate({
      model: "command",
      prompt: `You are a productivity assistant that summarizes and organizes todo lists. Analyze the following tasks and provide:
      1. A concise overview of all pending tasks
      2. Group similar tasks together
      3. Highlight any scheduling conflicts or important deadlines
      4. Suggest priorities
      
      Here are the pending todos:
      ${pendingTodos.map(todo => `- ${todo.title}: ${todo.description || '(no description)'}`).join('\n')}
      
      Summary:`,
      max_tokens: 400,
      temperature: 0.3,  // Lower temperature for more factual responses
    });

    // Clean up the response text
    let summary = response.generations[0].text.trim();
    
    // Remove any trailing incomplete sentences
    const lastPeriod = summary.lastIndexOf('.');
    if (lastPeriod > -1) {
      summary = summary.substring(0, lastPeriod + 1);
    }
    
    return summary;
  } catch (error) {
    console.error('Error generating summary with Cohere:', error);
    throw new Error('Failed to generate summary');
  }
};




// Send message to Slack
const sendToSlack = async (message) => {
  try {
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (!slackWebhookUrl) {
      throw new Error('Slack webhook URL not provided');
    }
    
    await axios.post(slackWebhookUrl, {
      text: message
    });
    
    return true;
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    throw new Error('Failed to send message to Slack');
  }
};

// Controller function to summarize todos and send to Slack
exports.summarizeAndSend = async (req, res) => {
  try {
    // Fetch all todos
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*');
    
    if (error) throw error;
    
    // Generate summary
    const summary = await summarizeTodos(todos);
    
    // Send to Slack
    await sendToSlack(`*Todo Summary*\n\n${summary}`);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Summary generated and sent to Slack successfully',
      summary 
    });
  } catch (error) {
    console.error('Error in summarizeAndSend:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to summarize and send todos' 
    });
  }
};