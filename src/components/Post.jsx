const Post = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>Vendor: {post.vendor.username}</p>
      <p>Description: {post.description}</p>
      <img src={post.image} alt={`title ${post.title}`} />
    </div>
  );
};

export default Post;
