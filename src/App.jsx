import { useState } from "react";
import "./App.css";
import AllPost from "./compnents/AllPost";
import SinglePost from "./compnents/SinglePost";
import SignIn from "./compnents/SignIn";
import Register from "./compnents/Register";
import { BASE_URL } from "./compnents/helper";

function App() {
  const [postById, setPostById] = useState(null);

  return (
    <>
      <div>
        <SignIn />
        <Register />
        <AllPost setPostById={setPostById} />
      </div>
    </>
  );
}

export default App;
