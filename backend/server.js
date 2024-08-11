const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json({ extended: false }));
app.use(cors())
app.use(fileUpload());

app.use('/uploads', express.static(path.join(__dirname, '../ignore/uploads')));
app.use('/api/posts', require('../backend/routes/postRouters'));
app.use('/api/users', require('../backend/routes/userRoutes'))
app.use('/api/user', require('../backend/routes/user'));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));