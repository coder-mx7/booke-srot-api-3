const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // استيراد مكتبة cors
const authorsPath = require('./routes/authrs') // تم تغيير هذا السطر
const loginPath = require('./routes/login')
const loger = require('./middleware/logger') // تأكد من أن هذا المسار صحيح
const dotenv = require('dotenv')
dotenv.config()
// تكوين cors للسماح بالوصول من مصادر مختلفة
app.use(cors());

// اتصال بقاعدة البيانات
mongoose.connect('mongodb+srv://amiinomino72:L8c8MRz5mjLLR5JV@backendone.yvhjywa.mongodb.net/?retryWrites=true&w=majority')
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
app.use('/api/authors', authorsPath); // تم تغيير هذا السطر
app.use('/api/login', loginPath );

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
