const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // استيراد مكتبة cors
const loger = require('./middleware/logger') // تأكد من أن هذا المسار صحيح
const dotenv = require('dotenv')
const {notFound,erorHandler} = require('./middleware/errors')
dotenv.config()
// تكوين cors للسماح بالوصول من مصادر مختلفة
app.use(cors());

// اتصال بقاعدة البيانات
mongoose.connect('mongodb://127.0.0.1:27017/servers')
    .then(() => {
        console.log('Connection to db...')
    })
    .catch((error) => {
        console.error('Failed to connect to the database...', error);
    });

// تفعيل middleware لفهم البيانات بصيغة JSON
app.use(express.json());

//middleware
app.use(loger) // تم تغيير هذا السطر

// تعريف واستخدام المسارات
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authrs')); // تم تغيير هذا السطر
app.use('/api/login', require('./routes/user') );


//Erorr hanlder ùiddleware 

app.use(notFound)

app.use(erorHandler)

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
