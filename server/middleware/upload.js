const path = require('path')
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, cb) { //request, file, callback
        cb(null, path.resolve(__dirname, '../..', 'static')) //(ошибка, путь(корневой путь, сам путь))
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}-${moment().format('DDMMYY-HHmmss_SSS')}`)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {
        cb(null, true)
    }   else {
        cb(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter,
    limits:{fileSize: 1024 * 1024 * 5}
})