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
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|/index(.html)?', (req,res)=>{
    // res.sendFile('./views/index.html', {root:__dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req,res)=>{
    res.redirect('/new-page.html');
});

//Route handlers
app.get('/hello(.html)?', (req,res,next)=>{
    console.log('Tentativa de carregar hello.html');
    next()    
}, (req,res)=>{
    res.send('Hello NodeJS');
});

//Funções encadeadas
const one = (req,res,next)=>{
    console.log('one');
    next();
}

const two = (req,res,next)=>{
    console.log('two');
    next();
}

const three = (req,res)=>{
    console.log('three');
    res.send('Finalizado');
}

app.get('/chain(.html)?', [one, two, three]);

app.all('*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use(errorHandler)

app.listen(PORT, ()=>console.log(`Servidor rodando na porta ${PORT}`))

