import "./App.css"

import { Cuber } from "./cuber/Cuber";

import { ADITYA } from "./cuber/MOCKCUBERS";

import { BrowserRouter,
         NavLink,
         Route,
         Routes } from "react-router-dom";
import CuberPage from "./cuber/CuberPage";
import CuberPageLoader from "./cuber/CuberPageLoader";
import NavBar from "./NavBar";

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
          <Route path="/users/:publicId" 
            element={
             <CuberPageLoader />
            } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;