import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContexts from "./Contexts";
import NewNavbar from "./NewNavbar";
import Products from "./Products/Products";
import TemporaryDrawer from "./elements/Drawer";
import Profile from "./Profile";

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
                {/* <TemporaryDrawer/> */}
              </UserContexts>
            }
          />
          <Route
            path="/profile"
            element={
              <UserContexts>
                <NewNavbar/>
                <Profile/>
              </UserContexts>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
