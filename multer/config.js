const multer = require('multer')

const FILE_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}

const newFilename = file => {
    console.log(file)
    const type = FILE_TYPE_MAP[file.mimetype]
    const newName = file.originalname
    .replace(`.${type}`,'')
    .split(' ').join('-')
    .replace('.jpg','')
    .replace('.jpeg','')
    .replace('.png','')
    return `${newName}-${Date.now()}.${type}`
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const valid = FILE_TYPE_MAP[file.mimetype]
        const isValid = !valid ? new Error('invalid image type') : null  

      cb(isValid, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, newFilename(file))
    }
  })

module.exports = storage