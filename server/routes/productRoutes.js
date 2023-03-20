const express = require("express");

const productController = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(protect, productController.getAllProducts)
  .post(protect, productController.createProduct)
  .patch(protect, productController.updateProduct)
  .put(protect, productController.updateProduct);

router.route("/:model").get(productController.getProduct);

module.exports = router;
