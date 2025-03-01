require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use('/api/items', itemsRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Connection error', error);
  });

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
