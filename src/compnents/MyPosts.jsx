import React, { useEffect, useState } from "react";
import { BASE_URL } from "./helper.jsx";
import { fetchPostById } from "./helper.jsx";
import { useParams } from "react-router-dom";

//Get Me pull
const MyPosts = async ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    async function fetchMyPost() {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            post: {
              title: "title",
              description: "description",
              price: "price",
              location: "location",
              willDeliver: true,
            },
          }),
        });
        const result = await response.json();
        if (response.ok) {
          setSuccess("Post created successfully!");
          return result;
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
    fetchMyPost();
  }, [postId, token]);

  return (
    <div>
      <h2>My Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>{success}</p>}
      {posts.map((post) => {
        return (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>{post.location}</p>
            <p>{post.willDeliver}</p>
            <p>{post.message}</p>
          </div>
        );
      })}
    </div>
  );
};

//New Post pull
const NewPost = async ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(null);
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (response.ok) {
      setSuccess("Post created successfully!");
      return result;
    } else {
      setError(result.error);
    }
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
};

//Update Post pull
const UpdatePost = async ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(null);
  const { postId } = useParams();

  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: "New Post",
          description: "This is a new post",
          location: "New York",
          price: 100,
          willDeliver: true,
        },
      }),
    });
    const result = await response.json();
    console.log(result);

    if (response.ok) {
      setSuccess("Post updated successfully!");
      return result;
    } else {
      setError(result.error);
    }
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
};

//Delete Post pull

const DeletePost = async ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(null);
  const { postId } = useParams();

  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      setSuccess("Post deleted successfully!");
      return result;
    } else {
      setError(result.error);
    }
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
};

export default MyPosts || NewPost || UpdatePost || DeletePost;
