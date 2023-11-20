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
        brandsForCategory = [
          ...brandsForCategory,
          ...state?.mapBrandsToCategories[item[i]],
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
      setBrandsForSelectedCategory(brandsForCategory);
    } else {
      let mapSelectedBrandsForCategories = {};
      const brandsForCategoriesMap = state?.mapBrandsToCategories;
      for (let key in brandsForCategoriesMap) {
        for (let i = 0; i < item.length; i++) {
          if (brandsForCategoriesMap[key]?.includes(item[i])) {
            // console.log(key,item)
            if (mapSelectedBrandsForCategories[key]?.length > 0) {
              mapSelectedBrandsForCategories[key] = [
                ...mapSelectedBrandsForCategories[key],
                item[i],
              ];
            } else {
              mapSelectedBrandsForCategories[key] = [item[i]];
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

  useEffect(() => {
    if (
      state?.mapSelectedBrandsToCategories &&
      Object.keys(state?.mapSelectedBrandsToCategories).length > 0
    ) {
      console.log(state?.mapSelectedBrandsToCategories);
    }
  }, [state?.mapSelectedBrandsToCategories]);

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
          ).map((name) => (
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
