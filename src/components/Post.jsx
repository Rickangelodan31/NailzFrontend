import React, { useState } from "react";
import classes from "./post.module.css";
import { Button } from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";
import { Token } from "@mui/icons-material";

const Post = ({ post, currentUser, handleDelete, handleUpdate }) => {


  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setSelectedImage(null);
    setShowOverlay(false);
  };

  const isPostOwner = currentUser && post.userId === currentUser.id;
  

  return (
    <div className={classes.post}>
      <h2>{post.title}</h2>
      <p>Vendor: {post.vendor.username}</p>
      <p>Description: {post.description}</p>
      <img
        src={post.image}
        alt={`Title: ${post.title}`}
        onClick={() => handleImageClick(post.image)}
      />
      {showOverlay && (
        <div className={classes.overlay} onClick={handleCloseOverlay}>
          <img src={selectedImage} alt={`Title: ${post.title}`} />
        </div>
      )}
      {isPostOwner && (
        <div className={classes.button}>
          <button onClick={() => handleUpdate(post.id)}>Update</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Post;
