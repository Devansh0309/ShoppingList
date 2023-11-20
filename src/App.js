import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContexts from "./Contexts";
import NewNavbar from "./NewNavbar";
import Products from "./Products/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <UserContexts>
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
