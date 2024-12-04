const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const {
  createBlog,
  viewBlogs,
  findBlogById,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");

router.post("/", auth, createBlog);

router.get("/", auth, viewBlogs);

router.get("/:id", auth, findBlogById);

router.put("/:id", auth, updateBlog);

router.delete("/:id", auth, deleteBlog);

module.exports = router;
