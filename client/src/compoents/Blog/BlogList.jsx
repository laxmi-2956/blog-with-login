import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("http://localhost:8080/api/blog", { withCredentials: true });
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      <Link to="/blogs/create">Create New Post</Link>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <Link to={`/blogs/${blog._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;