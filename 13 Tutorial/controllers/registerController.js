const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async(req,res)=>{
    const {user, pwd} = req.body
    if(!user || !pwd) return res.status(400).json({'message':'User ou Password inválidos'});
    
    //verificando user ou pwd duplicados
    const duplicate = await User.findOne({username: user}).exec();
    if(duplicate) return res.sendStatus(409); //Usuario Duplicado
    try {
        //encriptando pwd
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //salvando novo usuario
        const result =  await User.create({
            "username": user,            
            "password": hashedPwd
        });                        
        console.log(result);
        res.status(201).json({'sucesso':`Novo usuário ${user} criado!`});
    } catch (error) {
        res.status(400).json({'message':error.message});
    }
}

module.exports = {handleNewUser}