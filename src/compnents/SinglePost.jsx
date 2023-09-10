import { fetchPostById } from "./helper";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SinglePost() {
  const [postById, setPostById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    try {
      const fetchPostData = async () => {
        const postByIdData = await fetchPostById(postId); // Call your fetchPostById function
        setPostById(postByIdData);
        setLoading(false);
      };

      fetchPostData();
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  }, [postId]);

  return (
    <div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading post data.</p>
        ) : (
          <>
            <h2>{postById.title}</h2>
            <p>Description: {postById.description}</p>
            <p>Price: {postById.price}</p>
            <p>Location: {postById.location}</p>
            <p>Will Deliver: {postById.willDeliver ? "Yes" : "No"}</p>
            <p>Seller: {postById.author?.username}</p>
            <Link to={`/posts/${postId}/messages`}>Go to Messages</Link>
          </>
        )}
      </div>
    </div>
  );
}
