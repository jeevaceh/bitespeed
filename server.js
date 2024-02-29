
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const { identifyContact } = require('./controllers/contactController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/identify', identifyContact);

// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
