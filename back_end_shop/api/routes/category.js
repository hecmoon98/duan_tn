const express = require("express");
const routes = express.Router();
const categoryController = require('../controller/category');
// const checkAuth = require('../middleware/check-auth')



routes.post("/", categoryController.category_post);

routes.get("/", categoryController.category_get_all);

routes.get("/:categoryId", categoryController.category_get_one);

routes.put("/:categoryId", categoryController.category_put);

routes.delete("/:categoryId", categoryController.category_delete);

module.exports = routes;