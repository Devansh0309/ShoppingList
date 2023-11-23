import React, { useReducer, createContext } from "react";

export const ShoppingContext = createContext();

const dataFromLocal =
  typeof window !== "undefined" && window.localStorage
    ? localStorage.getItem("states")
    : "{}";
const states = JSON.parse(dataFromLocal);

const initialState = {
  userType: states ? states.userType : "",
  products: states ? states.products : [],
  categories: states ? states.categories : [],
  brands: states ? states.brands : [],
  mapBrandsToCategories: states ? states.mapBrandsToCategories : {},
  categoriesSelected: states ? states.categoriesSelected : [],
  brandsSelected: states ? states.brandsSelected : [],
  mapSelectedBrandsToCategories: states
    ? states.mapSelectedBrandsToCategories
    : {},
  cartItems: states ? states.cartItems : {},
  billAmount: states ? states.billAmount : 0,
  admin: states ? states.admin : [],
  toggleDrawer: states ? states.toggleDrawer : null,
  drawerState: states
    ? states.drawerState
    : {
        top: false,
        left: false,
        bottom: false,
        right: false,
      },
  openModal: states? states.openModal : false,
  changesAdded: states? states.changesAdded : false
};
function reducer(state, action) {
  switch (action.type) {
    case "SetStates":
      localStorage.setItem(
        "states",
        JSON.stringify({ ...state, ...action.payload })
      );
      // console.log("contexts line 38: ",states.sel)
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

function UserContexts(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ShoppingContext.Provider value={[state, dispatch]}>
      {props?.children}
    </ShoppingContext.Provider>
  );
}
export default UserContexts;
