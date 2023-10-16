const express = require("express");
const {
    getAllBlog,
    createBlog,
    getBlogByID,
    updateBlog,
    deleteBlog
} = require("../controllers/blog-controllers");

const router = express.Router();

router.route("/").get(getAllBlog).post(createBlog);
router.route("/:id").get(getBlogByID).put(updateBlog).delete(deleteBlog)

module.exports = router