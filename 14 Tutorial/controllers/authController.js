const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ 'message': 'User ou Password inválidos' });

    const foundUser = await User.findOne({username: user}).exec();
    if (!foundUser) return res.sendStatus(401); //Não autorizado

    //avaliando o pwd
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        //criando um JWT 
        const accessToken = jwt.sign(
            {
                "UserInfo":
                {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken })
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }