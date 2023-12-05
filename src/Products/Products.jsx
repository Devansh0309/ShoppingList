import React, { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "../Contexts";
import ProductCard from "../elements/JoyCard";
import "./Products.css";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfigs/firebaseConfigs";
import { useRef } from "react";

function Products() {
  const [state, dispatch] = useContext(ShoppingContext);
  const [categoriesAndBrandsMap, setCategoriesAndBrandsMap] = useState({});
  const typeOfChange = useRef("");

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("update in real-time");
      let changes = querySnapshot.docChanges();
      let products;
      changes.forEach((item) => {
        console.log("snapshot item", item);

        if (item?.doc?.id === "l8FKZZhmlnEbGTnWy65n") {
          typeOfChange.current = item?.type;
          products = item?.doc?.data()?.$return_value;
        }
      });

      if (!state.changesAdded) {
        dispatch({
          type: "SetStates",
          payload: {
            changesAdded: true,
            products: products,
          },
        });
      } else if (
        typeOfChange.current === "modified" ||
        typeOfChange.current === "removed"
      ) {
        dispatch({
          type: "SetStates",
          payload: {
            products: products,
          },
        });
      }

      // console.log("Current cities in CA: ", cities.join(", "));
    });
  }, []);

  useEffect(() => {
    if (state?.cartItems && Object.keys(state?.cartItems)?.length === 0) {
      let cartItems = {};
      for (let product of state?.products) {
        cartItems[product.id] = 0;
      }
      console.log("line 67 in product.jsx cartItems updating");
      dispatch({
        type: "SetStates",
        payload: {
          cartItems: cartItems,
        },
      });
    }

    if (
      state?.mapSelectedBrandsToCategories &&
      Object.keys(state?.mapSelectedBrandsToCategories)?.length > 0
    ) {
      setCategoriesAndBrandsMap(state?.mapSelectedBrandsToCategories);
    } else if (
      state?.mapBrandsToCategories &&
      Object.keys(state?.mapBrandsToCategories)?.length > 0
    ) {
      setCategoriesAndBrandsMap(state?.mapBrandsToCategories);
    }
  }, [state?.mapBrandsToCategories, state?.mapSelectedBrandsToCategories]);

  return (
    <div className="products-container">
      {Object.keys(categoriesAndBrandsMap)?.map((item) => {
        return (
          <div className="category-products-container" key={item}>
            <h2 className="category-heading">
              <span
                style={{
                  fontWeight: "200",
                  textDecoration: "underline",
                  textDecorationThickness: "2px",
                  textDecorationColor: "#1976d2",
                }}
              >
                Shop
              </span>
              {"   "}
              <span style={{ color: "#1976d2" }}>{item}</span>
            </h2>
            <div className="cards-container">
              {Object.values(categoriesAndBrandsMap[item])?.map((item2) => (
                <ProductCard
                  photo={state?.products[item2 - 1]?.images[0]}
                  title={state?.products[item2 - 1]?.title}
                  brand={state?.products[item2 - 1]?.brand}
                  description={state?.products[item2 - 1]?.description}
                  price={state?.products[item2 - 1]?.price}
                  stock={state?.products[item2 - 1]?.stock}
                  discountPercentage={
                    state?.products[item2 - 1]?.discountPercentage
                  }
                  thumbnail={state?.products[item2 - 1]?.thumbnail}
                  key={item + item2}
                  id={item2}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
