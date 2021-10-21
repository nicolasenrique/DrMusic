const express = require("express");
const router = express.Router();
const path = require('path');
const productsController = require("../controllers/productsController");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/img');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

router.get("/list", productsController.list);
router.get('/description', productsController.detail);
router.get('/admin', productsController.admin);
router.post('/admin', upload.single('img') ,productsController.store);

module.exports = router;
