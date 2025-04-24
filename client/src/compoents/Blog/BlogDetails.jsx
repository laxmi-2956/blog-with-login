import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(`http://localhost:8080/api/blog/${id}`, { withCredentials: true });
      setBlog(res.data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>Tags: {blog.tags.join(", ")}</p>
      <p>Author: {blog.author}</p>
    </div>
  );
}

export default BlogDetails;
