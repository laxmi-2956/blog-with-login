const blogmodel = require("../models/blog.model");

//  const  getBlogs = async (req, res) => {
//     try {
//         const savedBlog = await blogmodel.findById(newBlog._id).populate('author' , 'username email');
//            console.log('Saved blog with author:', savedBlog);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };  
 

const getBlogs = async (req, res) => {
    try {
        // blog ID ko request parameters se le rahe hain
        const blogId = req.params.id;

        // Blog ko ID ke through fetch karte hain aur author ko populate karte hain
        const savedBlog = await blogmodel.findById(blogId).populate('author', 'username email');

        if (!savedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Successfully fetched blog
        console.log('Saved blog with author:', savedBlog);
        res.json(savedBlog); // Response mein blog bhejenge
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createBlog = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        
        // Correct way to set the author as the logged-in user
        const newBlog = new blogmodel({
            title,
            content,
            tags,
            author: req.user._id // Using the logged-in user's ID here
        });
        
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateBlog = async (req, res) => {
    try {
        const blog = await blogmodel.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const updatedBlog = await blogmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await blogmodel.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await blog.remove();
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog
}