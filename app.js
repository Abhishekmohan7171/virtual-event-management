const express = require('express');
require('dotenv').config();
PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;