const { v2 } = require('cloudinary')

v2.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
    });

const uploadImage = async ( filepath ) => {
    return await v2.uploader.upload(filepath,{
        folder : 'detection'
    })
}   

const deleteImage = async (public_id) => {
    return await v2.uploader.destroy(public_id)
}

module.exports = { uploadImage, deleteImage }
