const express = require("express");
const routes = express.Router();
const colorSize = require("../controller/color-size");
// const checkAuth = require("../middleware/check-auth");




routes.post("/", colorSize.colorSize_post);

routes.get("/", colorSize.colorSize_get_all);

routes.get("/:colorSizeId", colorSize.colorSize_get_one);


routes.put("/:colorSizeId", colorSize.colorSize_put);

routes.delete("/:colorSizeId", colorSize.colorSize_delete);

module.exports = routes;
