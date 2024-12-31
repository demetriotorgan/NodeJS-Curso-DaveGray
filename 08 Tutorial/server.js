const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

const whiteList = ['https://www.google.com', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback)=>{
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback( new Error('Não permitido por CORS'));
        }
    },
    optionsSuccesStatus: 200
}
app.use(cors(corsOptions));

//middleware para usar json
app.use(express.json());

//middleware para serve static files
app.use('/',express.static(path.join(__dirname, '/public')));
app.use('/subdir',express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use(errorHandler)

app.listen(PORT, ()=>console.log(`Servidor rodando na porta ${PORT}`))

