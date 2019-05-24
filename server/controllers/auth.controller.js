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
        //по сути расшифровываем candidate.password и сравниваем с req.body.password
    
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

module.exports.createUser = async (req, res) => {
    const candidate = await User.findOne({login: req.body.login})
    if(candidate) {
        res.status(409).json({message: 'Такой логин уже занят'})
    } else {

        const codeScript = bcrypt.genSaltSync(10) //Назначаем шифрование из 10 символов
        

        const user = new User({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password, codeScript) //Передаем значение и  указываем метод шифрования
        })

        await user.save()
        res.status(201).json({user})
    }
} 
