import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function BlogForm({ editMode = false }) {
  const [formData, setFormData] = useState({ title: "", content: "", tags: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode) {
      const fetchBlog = async () => {
        const res = await axios.get(`http://localhost:8080/api/blog/${id}`, { withCredentials: true });
        setFormData({ ...res.data, tags: res.data.tags.join(", ") });
      };
      fetchBlog();
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = { ...formData, tags: formData.tags.split(",").map((tag) => tag.trim()) };
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/posts/${id}`, blogData, { withCredentials: true });
      } else {
        await axios.post("http://localhost:5000/api/posts", blogData, { withCredentials: true });
      }
      navigate("/blogs");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>{editMode ? "Edit" : "Create"} Blog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} value={formData.title} required />
        <textarea name="content" placeholder="Content" onChange={handleChange} value={formData.content} required />
        <input type="text" name="tags" placeholder="Tags (comma separated)" onChange={handleChange} value={formData.tags} />
        <button type="submit">{editMode ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default BlogForm;