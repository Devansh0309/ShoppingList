import "./App.css";
import {  Route, Routes } from "react-router-dom";
import UserContexts from "./Contexts";
import NewNavbar from "./NewNavbar";
import Products from "./Products/Products";
import TemporaryDrawer from "./elements/Drawer";
import Profile from "./Profile/Profile";
import ProductModal from "./elements/Modal";

function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route
            path="/"
            element={
              <UserContexts>
                <NewNavbar/>
                <Products/>
                {/* <Profile/> */}
                <ProductModal/>
                <TemporaryDrawer/>
              </UserContexts>
            }
          />
          <Route
            path="/profile"
            element={
              <UserContexts>
                <Profile/>
              </UserContexts>
            }
          />
        </Routes>
    </div>
  );
}

export default App;
