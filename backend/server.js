const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contestsRouter = require('./routes/contests');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dream11', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/contests', contestsRouter);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
