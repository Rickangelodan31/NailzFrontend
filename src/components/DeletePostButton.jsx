
const handleDeletePost = async (postId) => {
    if(window.confirm("do you want to delete"))
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/designers/${postId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },

        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      setError(`Error deleting post: ${error.message}`);
    }
  
    return ( <>post.map<button>Delete</button></> );
}
 
export default ;