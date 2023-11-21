import React from "react";
import "./Profile.css";
import { useContext, useState, useEffect } from "react";
import { ShoppingContext } from "../Contexts";

function Profile() {
  const [state, dispatch] = useContext(ShoppingContext);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItemsIds, setCartItemsIds] = useState([]);

  

  useEffect(() => {
    // console.log("inside 2nd useEffect in navbar")
    if (state?.cartItems && Object.keys(state?.cartItems)?.length > 0) {

      let cartItems = state?.cartItems;
      const itemsSelectedIds = Object.keys(cartItems)?.filter((id) => {
        if (state?.cartItems[id] > 0) {
          return id;
        }
      });
      setCartItemsIds(itemsSelectedIds);

      let sum = 0;
      for (let item in cartItems) {
        sum = sum + cartItems[item];
      }
      setTotalCartItems(sum);
    }
  }, [state?.cartItems, state?.billAmount]);

  useEffect(() => {
    if (cartItemsIds?.length > 0) {
      console.log(cartItemsIds);
    }
  }, [cartItemsIds]);
  return (
    <div className="user-profile">
      <div className="products-in-cart-and-heading">
        <h3 className="profile-heading">Order Summary</h3>
        <div className="products-in-cart">
          {state?.cartItems &&
          Object.keys(state?.cartItems)?.length > 0 &&
          cartItemsIds?.length > 0
            ? cartItemsIds?.map((item) => {
                return (
                  <div className="product">
                    <div className="product-top-content">
                      <p>{state?.products[item]?.title}</p>
                      <button
                        className="close-btn"
                        onClick={() => {
                          let billAmount = state?.billAmount;
                          let cartItems = state?.cartItems;
                          billAmount =
                            billAmount -
                            cartItems[item] * state?.products[item]?.price;
                          
                          cartItems[item] = 0;

                          dispatch({
                            type: "SetStates",
                            payload: {
                              cartItems: cartItems,
                              billAmount: billAmount,
                            },
                          });
                        }}
                      >
                        X
                      </button>
                    </div>
                    <div className="product-bottom-content">
                      {state?.cartItems[item]}Pieces | Rs.
                      {state?.products[item]?.price}
                    </div>
                    <hr />
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className="bottom-content">
        <div className="bill-info">Total: Rs.{state?.billAmount}</div>
        {"|"}
        <div className="purchase-items" onClick={()=>{
          
        }}>Proceed to Checkout</div>
      </div>
    </div>
  );
}

export default Profile;
