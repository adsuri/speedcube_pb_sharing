import "./App.css"
import { ADITYA } from "./cuber/MOCKCUBERS";
import CuberPage from "./cuber/CuberPage";
import NavBar from "./NavBar";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <div>
        <Routes>
          <Route path="/" 
            element={
              <NavLink to="/users">User Page</NavLink>
            } />
        </Routes>

        <Routes>
          <Route path="/users" 
            element={
              <CuberPage user={ADITYA}/>
            } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;