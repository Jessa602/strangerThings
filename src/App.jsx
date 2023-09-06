import { useState } from "react";
import "./App.css";
import AllPost from "./compnents/AllPost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <AllPost />
      </div>
    </>
  );
}

export default App;
