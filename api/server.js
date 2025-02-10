const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/completions', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    console.log('Received response from OpenAI:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from OpenAI API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching data from OpenAI API' });
  }
});

// ✅ Fix: Use this specific Vercel export format
module.exports = (req, res) => {
  app(req, res);
};
