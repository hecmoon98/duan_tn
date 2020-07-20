const express = require("express");
const routes = express.Router();
const productController = require("../controller/product");
const multer = require("multer");
// const checkAuth = require("../middleware/check-auth");

const storage = multer.diskStorage({
  //2
  destination: function(req, file, cd) {
    cd(null, "./uploads/");
  },
  filename: function(req, file, cd) {
    cd(null, file.originalname);
  }
});

const fileFilter = (req, file, cd) => {
  // 4 reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cd(null, true);
  } else {
    cd(null, false);
  }
};

const upload = multer({
  //3
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const cpUpload = upload.fields([
  { name: "images" }
]);

routes.post("/", cpUpload, productController.product_post);

routes.get("/", productController.product_get_all);

routes.get("/:productId", productController.product_get_one);


routes.put("/:productId", productController.product_put);

routes.delete("/:productId", productController.product_delete);

module.exports = routes;
