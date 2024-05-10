import React, { useState } from "react";
import classes from "./post.module.css";

const Post = ({ post }) => {
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
    </div>
  );
};

export default Post;
