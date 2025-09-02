const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'decsz2u5w',
  api_key: '738286595348453',
  api_secret: 'HEtn_dk_oFBnYIc-OSzZlhlnLvk',
});

// Multer Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "geo-green-products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      { width: 800, height: 800, crop: "limit" },
      { quality: "auto:good" },
    ],
  },
});

module.exports = { cloudinary, storage };
