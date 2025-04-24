import React from "react";
import './App.css'
import{ Routes, Route, Navigate } from "react-router-dom";

import Login from "./compoents/Auth/Login";

import BlogForm from "./compoents/Blog/BlogForm";
import BlogDetails from "./compoents/Blog/BlogDetails";
import SignUp from "./compoents/Auth/SignUp";
import BlogList from "./compoents/Blog/BlogList";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/create" element={<BlogForm />} />
        <Route path="/blogs/edit/:id" element={<BlogForm editMode={true} />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </div>
  );
}

export default App;