import "./App.css"

import CuberPageLoader from "./cuber/CuberPageLoader";
import NavBar from "./navigation/NavBar";
import Footer from "./navigation/Footer";
import HomePage from "./HomePage";
// import GoogleLoginButton from "./auth/GoogleLoginButton";

import { BrowserRouter,
         Route,
         Routes } from "react-router-dom";

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