const exspress = require('express')
const dataProduct = exspress.Router()
const multer = require('multer') 
const productController = require('../controllers/productController')
const adminAuth = require('../middlewares/adminAuth')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null,'./uploadsProduct/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() +  file.originalname);
    }
  });
    
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      console.log('format must jpg,jpeg,png')
    }
  };
  const uploads = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

dataProduct.post('/product', productController.postProduct)
dataProduct.get('/product/:productId',productController.getProduct)
dataProduct.get('/product/', productController.listProduct)
dataProduct.put('/product/update/:productId',adminAuth,productController.updateProduct)
dataProduct.delete('/product/:productId',adminAuth,productController.deleteProduct)
module.exports = dataProduct