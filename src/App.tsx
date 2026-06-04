import { useState } from "react"
import "./App.css"
import { ADITYA } from "./cuber/MOCKCUBERS";

function App() {
  return (
    <>
      <div className="container">
        <pre>{JSON.stringify(ADITYA, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;
