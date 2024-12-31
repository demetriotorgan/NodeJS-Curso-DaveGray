const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {this.users = data}    
}
const bcrypt = require('bcrypt');

const handleLogin = async(req,res)=>{
    const {user, pwd} = req.body
    if(!user || !pwd) return res.status(400).json({'message':'User ou Password inválidos'});
    
    const foundUser = usersDB.users.find(person => person.username === user);
    if(!foundUser) return res.sendStatus(401); //Não autorizado

    //avaliando o pwd
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        //criando um JWT 
        res.json({'sucesso':`o usuario ${user} esta logado`})
    }else{
        res.sendStatus(401);
    }
}

module.exports = {handleLogin}