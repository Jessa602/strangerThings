import React, { useState } from "react";
import { BASE_URL } from "./helper.jsx";
import MyProfile from "./MyProfile.jsx";

export default function SignIn({ token }) {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      });
      const result = await response.json();
      if (response.ok) {
        // Check if the response status is OK
        // Do something on success, like redirecting or setting a success message
        console.log(result); // Log the response data
        setSuccess("Sign-in successful!"); // Set a success message
        // Redirect to MyProfile component
        return <MyProfile token={token} />;
      } else {
        // Handle non-successful responses, e.g., displaying an error message
        setError(result.error); // Set the error message from the response
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Sign In</h2>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
