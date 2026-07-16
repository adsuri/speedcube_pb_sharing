import "./App.css"

import { BrowserRouter,
         NavLink,
         Route,
         Routes } from "react-router-dom";
import CuberPageLoader from "./cuber/CuberPageLoader";
import NavBar from "./navigation/NavBar";
import Footer from "./navigation/Footer";
import HomePage from "./HomePage";

function App() {
  return (
    <BrowserRouter>
    <div className="app">
        <NavBar />

        <main className="app-content">
          <Routes>
            <Route path="/" 
              element={
                <HomePage />
              } />
          </Routes>

          <Routes>
            <Route path="/users/:publicId" 
              element={
              <CuberPageLoader />
              } />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;