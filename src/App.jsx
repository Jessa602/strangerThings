import { useState } from "react";
import "./App.css";
import AllPost from "./compnents/AllPost";
import SinglePost from "./compnents/SinglePost";

function App() {
  const [postById, setPostById] = useState(null);

  return (
    <>
      <div>
        <AllPost setPostById={setPostById} />
      </div>
    </>
  );
}

export default App;
