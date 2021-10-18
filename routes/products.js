const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/list", productsController.list);
router.get('/description', productsController.detail);
router.get('/admin', productsController.admin);

module.exports = router;
