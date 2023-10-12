const express = require('express');
const app = express();
const booksPath = require('./routes/books')
const familyPath = require('./routes/authrs')
const mongoose = require('mongoose')
const Author = require('./models/Authrs')


// conniction to database
//localhost:27017
mongoose.connect('mongodb+srv://mohmich15:MqiDUvxUQVA8CsRt@cluster0.hd1kxcp.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connection to db...')
    }).catch((error) => {
        console.error('Failed to connect to the database...', error);
    })
// Aply Middlewares
app.use(express.json())
// routs
app.use('/api/books', booksPath)
app.use('/api/family', familyPath)

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});