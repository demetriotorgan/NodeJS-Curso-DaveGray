//instalando nodemon globalmente
//npm i nodemon -g
//Caso o arquivo principal seja index.js o nodemon ja o encontra no terminar digitando nodemon
//Para instalar nodemon como dev dependece: npm i nodemon -D
//Após criar os scripts para iniciar start e dev para inciar: npm run dev

//Par criar um projeto node: npm init -y
//Instalando o date-fns: npm i date-fns
//Para instalar todas as dependencias em package.json: npm install
//Para instalar uma versao especifica: npm i uuid@...
//Para instalar atualizações em todo o package.json: npm update
//Para remover uma dependencia: npm un, npm rm nodemon -D ou -g

//Gerando id's
//npm i uuid

//Exemplo:
const {format} = require('date-fns');
const {v4: uuid} = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))
console.log(uuid());

