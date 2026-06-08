import "./App.css"
import { ADITYA } from "./cuber/MOCKCUBERS";
import CuberPage from "./cuber/CuberPage";

function App() {
  return (
    <>
      <CuberPage user={ADITYA}/>
    </>
  );
}

export default App;