import React, { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "../Contexts";
import ProductCard from "../elements/JoyCard";
import "./Products.css";

function Products() {
  const [state, dispatch] = useContext(ShoppingContext);
  const [categoriesAndBrandsMap, setCategoriesAndBrandsMap] = useState([]);

  useEffect(() => {
    if(state?.cartItems && Object.keys(state?.cartItems)?.length===0){
      let cartItems={}
      for(let product of state?.products){
        cartItems[product.id] = 0
      }
      dispatch({
        type: "SetStates",
        payload: {
          cartItems: cartItems
        },
      })
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
              {Object.values(categoriesAndBrandsMap[item])?.map((item2) => 
                state?.products[item2-1]?.stock>0?<ProductCard 
                photo={state?.products[item2-1]?.images[0]}
                title={state?.products[item2-1]?.title}
                brand={state?.products[item2-1]?.brand}
                
                description={state?.products[item2-1]?.description}
                price={state?.products[item2-1]?.price}
                stock={state?.products[item2-1]?.stock}
                discountPercentage={state?.products[item2-1]?.discountPercentage}
                thumbnail={state?.products[item2-1]?.thumbnail}
                key={item+item2}
                id={item2-1}
                />:null
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
