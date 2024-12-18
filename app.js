const express = require('express');
require('dotenv').config();
PORT = process.env.PORT;
const mongoose = require('mongoose');
const {logger} = require('./src/middleware/logger');
const user = require('./src/routes/user');
const event = require('./src/routes/event-management');
const participant = require('./src/routes/participant-management');
const { errorHandler } = require('./src/middleware/errorHandler');
const app = express();

//connect to mongo db
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})

app.use(logger);
app.use(errorHandler)
app.use(express.json());
app.use('/api/v1/user',user);
app.use('/api/v1/events',event);
app.use('/api/v1/user/event/',participant);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;