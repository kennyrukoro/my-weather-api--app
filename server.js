const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 8080;

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).send({ error: 'City is required' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    res.send(response.data);
  } catch (err) {
    res.status(500).send({ error: 'Could not fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

