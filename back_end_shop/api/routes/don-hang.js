const express = require("express");
const routes = express.Router();
const donHang = require("../controller/don-hang");
// const checkAuth = require("../middleware/check-auth");




routes.post("/", donHang.donHang_post);

// routes.get("/", donHang.donHang_get_all);

// routes.get("/:donHangId", donHang.donHang_get_one);


// routes.put("/:donHangId", donHang.donHang_put);

// routes.delete("/:donHangId", donHang.donHang_delete);

module.exports = routes;
