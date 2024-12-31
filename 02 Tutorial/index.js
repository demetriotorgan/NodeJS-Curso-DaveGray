const fs = require('fs')
const path = require('path')

//primeira abordagem
fs.readFile('./files/starter.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
})

//segunda abordagem
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), (err, data) => {
    if (err) throw err;
    console.log(data.toString());
})

//writeFile
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Node escrevendo com writeFile', (err) => {
    if (err) throw err;
    console.log('Escrita Completa');

    //appendFile
    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\nTestando appendFile', (err) => {
        if (err) throw err;
        console.log('Append Completo');

        //rename
        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
            if (err) throw err;
            console.log('Rename Completo');
        })
    })
})

//Node é assincrono, exibi a leitura do arquivo apenas ao final
console.log('Hello Node JS...s')

//saida com erros 
process.on('uncaughtException', err => {
    console.error(`Um erro inesperado: ${err}`);
    process.exit(1);
})
