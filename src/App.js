import "./App.css";
// import SignIn from "./Auth/SigIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContexts from "./Contexts";
import Navbar from "./Navbar";
import NewNavbar from "./NewNavbar";
import Products from "./Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <UserContexts>
                {/* <Navbar/> */}
                <NewNavbar/>
                <Products/>
              </UserContexts>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
