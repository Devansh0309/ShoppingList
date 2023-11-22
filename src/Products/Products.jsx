import React, { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "../Contexts";
import ProductCard from "../elements/JoyCard";
import "./Products.css";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfigs/firebaseConfigs";

function Products() {
  const [state, dispatch] = useContext(ShoppingContext);
  const [categoriesAndBrandsMap, setCategoriesAndBrandsMap] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("update in real-time")
      // const cities = [];
      let admin;let products
      querySnapshot.forEach((doc) => {
        // console.log(doc.id)

        if(doc?.id==="admin"){
          admin=doc?.data()?.email
        }
        else if(doc?.id==="l8FKZZhmlnEbGTnWy65n"){
          products=doc?.data()?.$return_value
        }
        // cities.push(doc.data().name);
      });

      dispatch({
        type: "SetStates",
        payload: {
          admin:admin,
          products:products
        },
      })

      // console.log("Current cities in CA: ", cities.join(", "));
    });
  }, []);

  useEffect(() => {
    if (state?.cartItems && Object.keys(state?.cartItems)?.length === 0) {
      let cartItems = {};
      for (let product of state?.products) {
        cartItems[product.id] = 0;
      }
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
              Shop {"->"} {item}
            </h2>
            <div className="cards-container">
              {Object.values(categoriesAndBrandsMap[item])?.map((item2) => (
                <ProductCard
                  photo={state?.products[item2]?.images[0]}
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
