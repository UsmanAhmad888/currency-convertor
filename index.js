const express = require('express');
const app = express();
const currencyRoutes = require('./routes/currencyRoutes');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Logging middleware
app.use(cors()); // Enable CORS

// Routes
app.use('/api', currencyRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error' 
  });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
