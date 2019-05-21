//Проверяем в глобальной переменной production сборка или dev
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./keys.prod')
} else {
    module.exports = require('./keys.dev')
}