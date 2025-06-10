/ server.js

// Import the Express framework
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define the port the server will run on. 
// Koyeb provides a PORT environment variable. We use that or default to 8080.
const PORT = process.env.PORT || 8080;

// Define the target URL for the redirection.
const REDIRECT_URL = 'https://www.google.com/search?q=temporary+redirect';

/**
 * Root route handler for health checks.
 * Koyeb will periodically ping this route to ensure the app is alive.
 */
app.get('/', (req, res) => {
    res.status(200).send('Server is running and healthy!');
});

/**
 * Route handler for GET requests to '/keyob'
 * This endpoint will respond with a 307 Temporary Redirect status code.
 */
app.get('/keyob', (req, res) => {
  console.log(`Received request for /keyob. Redirecting to: ${REDIRECT_URL}`);
  
  // Respond with a 307 redirect status and the target URL.
  res.redirect(307, REDIRECT_URL);
});

/**
 * A catch-all route for any other request.
 * This will respond with a 404 Not Found error.
 */
app.use((req, res) => {
    res.status(404).send("Sorry, can't find that!");
});

// Start the server. 
// It listens on all network interfaces (0.0.0.0) on the port specified by Koyeb.
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log(`-> Health check available at http://localhost:${PORT}/`);
  console.log(`-> Redirect endpoint at http://localhost:${PORT}/keyob`);
});
