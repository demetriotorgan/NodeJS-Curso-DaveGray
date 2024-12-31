require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

//Connect to MongoDB
connectDB();

//custom middleware logger
app.use(logger);
app.use(cors(corsOptions));

//middleware para usar json
app.use(express.json());

//middleware para cookies
app.use(cookieParser());

//middleware para serve static files
app.use('/',express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use(errorHandler)

mongoose.connection.once('open', ()=>{
    console.log('Conectado ao MongoDB');
    app.listen(PORT, ()=>console.log(`Servidor rodando na porta ${PORT}`));
});
