import { fetchPosts as fetchAllPosts } from "./helper.jsx";
import {} from "./SinglePost.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllPost({ setPostById }) {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const fetchPostsResults = async () => {
        const postsResults = await fetchAllPosts();
        setPosts(postsResults);
        setLoading(false);
      };
      fetchPostsResults();
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <input
        type="text"
        placeholder="Search Posts"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <div className="posts">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error. Please try again.</h1>
        ) : (
          posts
            .filter((post) => {
              if (searchTerm === "") {
                return post;
              } else if (
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return post;
              }
            })
            .map((post) => {
              return (
                <div key={post._id} className="post">
                  <Link to={`/posts/${post._id}`}>
                    <h2>{post.title}</h2>
                  </Link>
                  <p>{post.description}</p>
                  <p>Price: {post.price}</p>
                  <p> Post ID: {post.id}</p>
                  <p>Location: {post.location}</p>
                  <p>Seller: {post.author.username}</p>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
