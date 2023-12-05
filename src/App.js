import "./App.css";
import {  Route, Routes } from "react-router-dom";
import UserContexts from "./Contexts";
import NewNavbar from "./NewNavbar";
import Products from "./Products/Products";
import TemporaryDrawer from "./elements/Drawer";
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
                <ProductModal/>
                <TemporaryDrawer/>
              </UserContexts>
            }
          />
        </Routes>
    </div>
  );
}

export default App;
