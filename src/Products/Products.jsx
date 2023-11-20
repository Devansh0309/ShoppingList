import React, { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "../Contexts";
import ProductCard from "../elements/JoyCard";
import "./Products.css";

function Products() {
  const [state, dispatch] = useContext(ShoppingContext);
  const [categoriesAndBrandsMap, setCategoriesAndBrandsMap] = useState([]);

  useEffect(() => {
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
              {Object.values(categoriesAndBrandsMap[item])?.map((item2) => {
                return <ProductCard 
                photo={state?.products[item2]?.images[0]}
                key={item+item2}
                />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
