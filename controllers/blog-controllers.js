const blogService  = require("../services/blog-service");

exports.getAllBlog = async (req, res) => {
    try {
        const blogs = await blogService.getAllBlogs();
        res.json({ data: blogs, status: 200})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.createBlog = async (req, res) => {
    try {
        const blogs = await blogService.createBlog(req.body);
        res.json({data: blogs, status: 201})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getBlogByID = async (req, res) => {
    try {
        const blogs = await blogService.getBlogById(req.params.id);
        res.json({data: blogs, status: 200})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const blogs = await blogService.updateBlog(req.params.id, req.body);
        res.json({data: blogs, status: 200})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const blogs = await blogService.deleteBlog(req.params.id);
        res.json({data: blogs, status: 200})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}