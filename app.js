const express = require('express');
require('dotenv').config();
PORT = process.env.PORT;
const mongoose = require('mongoose');
const {logger} = require('./middleware/logger');
const user = require('./routes/user');
const app = express();

//connect to mongo db
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})

app.use(logger);
app.use(express.json());
app.use('/api/v1/user',user);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;