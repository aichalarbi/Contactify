const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/connectDB');
const Person = require('./models/personModel'); 


const app = express();
app.use(bodyParser.json());

const router = require('./routes/person');
app.use('/', router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

connectDB();
app.listen(5000, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Server is running on port 5000`);
    }
});
