const express = require('express');
const app = express();
const path = require('path');

const APP_ID = "84c1dee7";
const APP_key = "e93d09f673151e86e673d91592247e65";

app.use(express.static(path.join(__dirname, '')));

app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  const baseURL = `https://api.edamam.com/search?q=${q}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;

  try {
    
    const fetch = await import('node-fetch');
    const response = await fetch.default(baseURL); 
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('An error has occurred:', error);
    res.status(500).json({ error: 'An error occurred on the server' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});
