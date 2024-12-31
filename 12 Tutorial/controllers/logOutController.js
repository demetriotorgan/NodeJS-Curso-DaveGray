const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {this.users = data}    
}

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogOut = async(req,res)=>{
    //No Cliente tb deletamos o accessToken
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); //Sem conteúdo    
    const refreshToken = cookies.jwt;

    //Verificando se existe refreshToken no DB
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, maxAge:24*60*60*1000})
        return res.sendStatus(204);
    }
    
    //Deletando o refreshToken no DB
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ''};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );
    res.clearCookie('jwt', {httpOnly: true});
    res.sendStatus(204);
}

module.exports = {handleLogOut}