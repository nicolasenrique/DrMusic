const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require("../controllers/productsController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/products");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

router.get("/list",         productsController.list); // Sugerencia Nico router.get("/", productsController.list);
router.get("/create",       productsController.create);
router.get("/:id",          productsController.detail);

router.post("/create",      upload.single("img"), productsController.store);
router.get('/:id/edit',     productsController.edit);
router.put('/update',       upload.single('imagen'), productsController.update);
router.delete('/:id/delete',productsController.delete);

module.exports = router;
