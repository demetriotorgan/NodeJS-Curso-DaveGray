const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

//Iniciando o objeto criado
const myEmitter = new MyEmitter();

//Adicionando listener para o logEvent
myEmitter.on('log', (msg)=> logEvents(msg));
setTimeout(()=>{
    //Emit event
    myEmitter.emit('log', 'Log evnet emitido');    
}, 2000);