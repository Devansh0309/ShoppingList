import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfigs/firebaseConfigs";
import { ShoppingContext } from "./Contexts";
import SignIn from "./Auth/SigIn";

function Navbar() {
  const [state, dispatch] = useContext(ShoppingContext);
  const [categorySelected,setCategorySelected] = useState("")
  const [brandsForSelectedCategory, setBrandsForSelectedCategory] = useState([])
  const [brandSelected,setBrandSelected] = useState("")

  useEffect(() => {
    const docRef = doc(db, "products", "l8FKZZhmlnEbGTnWy65n");

    const temp = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        let products = [];
        products = data["$return_value"];
        let categories = [];
        let brands = [];
        for (let i = 0; i < products.length; i++) {
          categories[i] = products[i].category;
          brands[i] = products[i].brand;
        }
        const uniqueCategories = Array.from(new Set(categories));
        const uniqueBrands = Array.from(new Set(brands));
        let mapBrandsToCategories = {};

        for (let i = 0; i < uniqueCategories.length; i++) {
          let categoryBrands=[]
          for (let j = 0; j < products.length; j++) {
            if (products[j]["category"] === uniqueCategories[i]) {
              categoryBrands.push(products[j]["brand"])
            }
          }
          // let categoryBrands=products.filter((item)=>{
          //     if(item["category"]===uniqueCategories[i]){
          //         const brand=item.brand
          //         console.log(brand)
          //         return brand
          //     }
          // })
          const uniqueCategoryBrands = Array.from(new Set(categoryBrands));
          // console.log(categoryBrands)
          mapBrandsToCategories[uniqueCategories[i]] = uniqueCategoryBrands;
        }

        dispatch({
          type: "SetStates",
          payload: {
            products: products,
            categories: uniqueCategories,
            brands: uniqueBrands,
            mapBrandsToCategories: mapBrandsToCategories,
          },
        });
        console.log("Document data:", products);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    temp();
  }, []);

  return (
    <div className="nav-container">
      <div className="company-logo">Company Logo</div>
      <select className="category-dropdown" onChange={(e)=>{
        setCategorySelected(e.target.value)
        setBrandsForSelectedCategory(state?.mapBrandsToCategories[e.target.value])
      }}>
        {state?.categories?.map((item) => (
          <option>{item}
          </option>
        ))}
      </select>
      <select className="brand-dropdown" >
        {brandsForSelectedCategory?.map((item)=><option>{item}</option>)}
      </select>
      <SignIn/>
    </div>
  );
}

export default Navbar;
