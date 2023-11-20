import React, { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "./Contexts";

function Products() {
  const [state, dispatch] = useContext(ShoppingContext);
  const [categoriesAndBrandsMap, setCategoriesAndBrandsMap] = useState([]);

  useEffect(() => {
    if (
      state?.mapSelectedBrandsToCategories &&
      Object.keys(state?.mapSelectedBrandsToCategories)?.length > 0
    ) {
      setCategoriesAndBrandsMap(
        state?.mapSelectedBrandsToCategories
      );
    } else if (
      state?.mapBrandsToCategories &&
      Object.keys(state?.mapBrandsToCategories)?.length > 0
    ) {
      setCategoriesAndBrandsMap(state?.mapBrandsToCategories)
    }
  }, [state?.mapBrandsToCategories, state?.mapSelectedBrandsToCategories]);
  return (
    <div className="products-container">
      {Object.keys(categoriesAndBrandsMap)?.map((item) => {
        return (
          <div className="category-products-container">
            <h2>Shop by {item}</h2>
            {
            // (state?.mapSelectedBrandsToCategories
            //   ? Object?.values(state?.mapSelectedBrandsToCategories[item])
            //   : state?.mapBrandsToCategories
            //   ? Object?.values(state?.mapBrandsToCategories[item])
            //   : []
            // )
            
            Object.values(categoriesAndBrandsMap[item])?.map((item2) => {
              return <div>{item2}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Products;
