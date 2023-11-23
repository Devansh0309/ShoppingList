import { useContext, useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { ShoppingContext } from "../Contexts";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  icon,
  title,
  brandsForSelectedCategory,
  setBrandsForSelectedCategory,
}) {
  const [item, setItem] = useState([]);
  const [state, dispatch] = useContext(ShoppingContext);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItem(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    if (title === "Categories") {
      let brandsForCategory = [];
      for (let i = 0; i < item.length; i++) {
        let brandsForId=[]
        for(let j of state?.mapBrandsToCategories[item[i]]){
            brandsForId.push(state?.products[j-1]?.brand)
        }
        brandsForCategory = [
          ...brandsForCategory,
          ...brandsForId,
        ];
      }

      let mapSelectedBrandsForCategories = {};
      const brandsForCategoriesMap = state?.mapBrandsToCategories;
      for (let i = 0; i < item.length; i++) {
        mapSelectedBrandsForCategories[item[i]] =
          brandsForCategoriesMap[item[i]];
      }

      dispatch({
        type: "SetStates",
        payload: {
          categoriesSelected: item,
          mapSelectedBrandsToCategories: mapSelectedBrandsForCategories,
        },
      });
      setBrandsForSelectedCategory(Array.from(new Set(brandsForCategory)));
    } else {
      let mapSelectedBrandsForCategories = {};
      const brandsForCategoriesMap = state?.mapBrandsToCategories;
      for (let key in brandsForCategoriesMap) { //key is category

        let brandsForId=[]//brandsForCategory is array for unique brands for a category-key
        for(let j of brandsForCategoriesMap[key]){
            brandsForId.push(state?.products[j-1]?.brand)
        }
        brandsForId=Array.from(new Set(brandsForId))

        for (let i = 0; i < item.length; i++) { //item is arr of selected brands
          if (brandsForId?.includes(item[i])) {
            let IdForCategoryBrand=[]
            for(let k=1;k<=state?.products?.length;k++){  // k is id of product
                if(state?.products[k-1]?.category === key && state?.products[k-1]?.brand === item[i]){
                    IdForCategoryBrand.push(k) // k is id of product having category-key and brand-item[i]
                }
            }
            // console.log(key,item)
            if (mapSelectedBrandsForCategories[key]?.length > 0) {
              mapSelectedBrandsForCategories[key] = [
                ...mapSelectedBrandsForCategories[key],
                ...IdForCategoryBrand,
              ];
            } else {
              mapSelectedBrandsForCategories[key] = [...IdForCategoryBrand];
            }
          }
        }
      }
      dispatch({
        type: "SetStates",
        payload: {
          brandsSelected: item,
          mapSelectedBrandsToCategories: mapSelectedBrandsForCategories,
        },
      });
    }
  }, [item]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label" sx={{ color: "white" }}>
          {icon} {title}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={item}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => ""}
          MenuProps={MenuProps}
        >
          {(title === "Categories"
            ? state?.categories
            : brandsForSelectedCategory?.length > 0
            ? brandsForSelectedCategory
            : state?.brands
          )?.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={item.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
