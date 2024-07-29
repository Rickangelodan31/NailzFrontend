import React from "react";
import Post from "../components/Post";

const PostList = ({ posts, currentUser, handleDelete, handleUpdate }) => {
  // const handleDelete = (postId) => {
  //   // Logic to delete the post
  //   console.log('Deleting post with ID:', postId);
  // };

  // const handleUpdate = (postId) => {
  //   // Logic to update the post
  //   console.log('Updating post with ID:', postId);
  // };
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          currentUser={currentUser}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

// PostList.propTypes = {
//   posts: PropTypes.array.isRequired,
//   currentUser: PropTypes.object.isRequired,
//   handleDelete: PropTypes.func.isRequired,
//   handleUpdate: PropTypes.func.isRequired,
// };
export default PostList;
