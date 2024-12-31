const User = require('../model/User');

const handleLogOut = async(req,res)=>{
    //No Cliente tb deletamos o accessToken
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); //Sem conteúdo    
    const refreshToken = cookies.jwt;

    //Verificando se existe refreshToken no DB
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, maxAge:24*60*60*1000})
        return res.sendStatus(204);
    }
    
    //Deletando o refreshToken no DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', {httpOnly: true});
    res.sendStatus(204);
}

module.exports = {handleLogOut}