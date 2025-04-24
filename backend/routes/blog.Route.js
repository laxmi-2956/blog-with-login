const express = require("express");
const { getBlogs, createBlog, updateBlog, deleteBlog } = require("../controllers/blogController");
const isAuth = require("../middleware/authMiddleware");


const Blogroutes = express.Router();

Blogroutes.get('/getblogs/:id' ,getBlogs )
Blogroutes.post('/create' , isAuth,  createBlog)
Blogroutes.patch('/updateblog/:id' ,isAuth , updateBlog)
Blogroutes.delete('/Delete/:id' ,isAuth, deleteBlog )

module.exports = Blogroutes
