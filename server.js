require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./authRoutes');
const dataRoutes = require('./dataRoutes');
const bodyParser = require('body-parser');
const dashboardRoutes = require('./dashboardRoutes');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', dataRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
