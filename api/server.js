const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, 
  message: { error: 'You have reached your daily limit of 6 requests. Try again tomorrow.' },
  statusCode: 429,
  standardHeaders: true, 
  legacyHeaders: false,
})

app.post('/api/server', limiter, async (req, res) => {
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

module.exports = (req, res) => {
  app(req, res);
};
