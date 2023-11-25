import React from "react";
import "./Profile.css";
import { useContext, useState, useEffect } from "react";
import { ShoppingContext } from "../Contexts";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfigs/firebaseConfigs";

function Profile() {
  const [state, dispatch] = useContext(ShoppingContext);
  const [cartItemsIds, setCartItemsIds] = useState([]);

  console.log("line 12", state?.billAmount);

  useEffect(() => {
    // console.log("inside 2nd useEffect in navbar")
    if (state?.cartItems && Object.keys(state?.cartItems)?.length > 0) {
      let cartItems = state?.cartItems;
      console.log(
        "line 17",
        "cartItems updating",
        state?.cartItems,
        state?.billAmount
      );
      const productsIds=Object.keys(cartItems)
      const itemsSelectedIds = productsIds?.filter((id) => {
        if (state?.cartItems[id] > 0) {
          return id;
        }
      });
      setCartItemsIds(itemsSelectedIds);

    }
  }, [state?.billAmount,state?.cartItems]);

  useEffect(()=>{

    if(cartItemsIds?.length>0){
      console.log("cartItemsIds: ",cartItemsIds)
    }

  },[cartItemsIds])

  return (
    <div className="user-profile">
      <div className="products-in-cart-and-heading">
        <h3 className="profile-heading">Order Summary</h3>
        <div className="products-in-cart">
          {
          // state?.cartItems &&
          // Object.keys(state?.cartItems)?.length > 0 &&
          // cartItemsIds?.length > 0
          //   ? 
            cartItemsIds.map((item) => {
                return (
                  <div className="product" key={item}>
                    <div className="product-top-content">
                      <p>{state?.products[item - 1]?.title}</p>
                      <button
                        className="close-btn"
                        onClick={() => {
                          let billAmount = state?.billAmount;
                          let cartItems = state?.cartItems;
                          billAmount =
                            billAmount -
                            cartItems[item] * state?.products[item - 1]?.price;

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
                      {state?.products[item - 1]?.price}
                    </div>
                    <hr />
                  </div>
                );
              })
            // : null
            }
        </div>
      </div>
      <div className="bottom-content">
        <div className="bill-info">Total: Rs.{state?.billAmount}</div>
        {"|"}
        <div
          className="purchase-items"
          onClick={() => {
            if (state?.userType === "customer") {
              let products = state?.products;
              let cartItems = state?.cartItems;
              for (let item of cartItemsIds) {
                let stock = products[item - 1]?.stock;
                // console.log(stock, "line 101 purchase in profile");
                products[item - 1].stock = stock - cartItems[item];
                cartItems[item] = 0;
                console.log(
                  products[item - 1].stock,
                  cartItems[item],
                  stock,
                  "line 111 purchase in profile"
                );
              }

              
              console.log(
                "line 129",
                "doc updated",
                "cartItems= ",
                state?.cartItems,
                "billAmount ",
                state?.billAmount
              );
              const docRef = doc(db, "products", "l8FKZZhmlnEbGTnWy65n");

              const temp = async () => {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                  console.log("line 96");

                  await updateDoc(docRef, {
                    $return_value: products,
                  })
                    .then(() => {
                      dispatch({
                        type: "SetStates",
                        payload: {
                          billAmount: 0,
                          cartItems: cartItems,
                        },
                      });
                      console.log(
                        "line 115",
                        "doc updated",
                        "cartItems= ",
                        state?.cartItems,
                        "billAmount ",
                        state?.billAmount
                      );
                    })
                    .catch((err) => {
                      console.log("line 123", err);
                    });
                }
              };
              temp();
            }
          }}
        >
          Proceed to Checkout
        </div>
      </div>
    </div>
  );
}

export default Profile;
