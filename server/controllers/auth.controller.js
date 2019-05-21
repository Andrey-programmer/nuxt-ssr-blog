const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
    // Находим пользователя по логину
    const candidate = await User.findOne({login: req.body.login})

    if(candidate) {//Если пользователь есть
        // Сравниваем пароли в БД и от пользователя
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)
    
        if(isPasswordCorrect) {
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id //поле _id присутствует у любой модели в mongoose
            }, 
            keys.JWT, //секретный ключ JWT
            {
                expiresIn: 60*60 //время жизни токена в сессии
            })
            res.status(200).json({token})
        } else {
            res.status(404).json({
                message: 'Неверный пароль'
            })
        }
    } else {
        res.status(404).json({
            message: 'Пользователь не найден'
        })
    }
}

module.exports.createUser = (req, res) => {

}
