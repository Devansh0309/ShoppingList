import { useContext, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "./e-commerce-logo.avif";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { BiCategory } from "react-icons/bi";
import MultipleSelectCheckmarks from "./elements/MultipleSelect";
import { ShoppingContext } from "./Contexts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfigs/firebaseConfigs";
import SignIn from "./Auth/SignIn";
// import { useNavigate } from "react-router-dom";

function NewNavbar() {
  // console.log(signIn);
  const [state, dispatch] = useContext(ShoppingContext);
  // const navigate = useNavigate();

  const [pages, setPages] = useState([
    // { title: "Add Product", logo: <BiSolidCategory /> },
    { title: "Categories", logo: <BiSolidCategory /> },
    { title: "Brands", logo: <BiCategory /> },
    { title: "Cart", logo: <MdOutlineShoppingCart /> },
  ]);
  const [userItems, setUserItems] = useState([
    { title: "Profile", action: window.open },
    { title: "Login" },
    {
      title: "Logout",
      action: () => {
        dispatch({
          type: "SetStates",
          payload: {
            userType: "",
          },
        });
      },
    },
  ]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  //   const [categoriesSelected, setCategoriesSelected] = useState("");
  const [brandsForSelectedCategory, setBrandsForSelectedCategory] = useState(
    state?.brands
  );
  const [totalCartItems, setTotalCartItems] = useState(0);
  //   const [brandsSelected, setBrandsSelected] = useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // console.log("inside 1st useEffewct","line 102")
    let products = state?.products;

    let categories = [];
    let brands = [];
    for (let i = 0; i < products?.length; i++) {
      categories[i] = products[i].category;
      brands[i] = products[i].brand;
    }
    const uniqueCategories = Array.from(new Set(categories));
    const uniqueBrands = Array.from(new Set(brands));
    let mapBrandsToCategories = {};

    for (let i = 0; i < uniqueCategories.length; i++) {
      let categoryBrands = [];
      for (let j = 0; j < products.length; j++) {
        if (products[j]?.category === uniqueCategories[i]) {
          categoryBrands.push(products[j]?.id);
        }
      }
      mapBrandsToCategories[uniqueCategories[i]] = categoryBrands;
    }

    let cartItems = state?.cartItems;
    let bill = state?.billAmount;
    let changesMadeinCart = false;
    for (let id in cartItems) {
      if (products[id - 1].stock < cartItems[id]) {
        cartItems[id] = products[id - 1].stock;
        bill = bill - (cartItems[id] - products[id - 1].stock);
        changesMadeinCart = true;
      }
    }
    console.log("mapBrandsToCategories updating", "line 135");
    dispatch({
      type: "SetStates",
      payload: changesMadeinCart
        ? {
            categories: uniqueCategories,
            brands: uniqueBrands,
            mapBrandsToCategories: mapBrandsToCategories,
            cartItems: cartItems,
            billAmount: bill,
          }
        : {
            categories: uniqueCategories,
            brands: uniqueBrands,
            mapBrandsToCategories: mapBrandsToCategories,
          },
    });

    // const dataFromLocal =
    //   typeof window !== "undefined" && window.localStorage
    //     ? localStorage.getItem("states")
    //     : "{}";
    // if(dataFromLocal){return}

    const docRef2 = doc(db, "products", "admin");

    const temp2 = async () => {
      const docSnap = await getDoc(docRef2);
      if (docSnap.exists()) {
        const data = docSnap.data();
        dispatch({
          type: "SetStates",
          payload: {
            admin: data?.emails,
          },
        });
      }
    };

    temp2();
  }, [state?.products]);

  useEffect(() => {
    // console.log("inside 2nd useEffect in navbar")
    let cartItems = state?.cartItems;
    let sum = 0;
    for (let item in cartItems) {
      sum = sum + cartItems[item];
    }
    setTotalCartItems(sum);
  }, [state?.billAmount, state?.cartItems]);

  return (
    <AppBar position="fixed" sx={{maxHeight:"116px",width:"100%"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* For mobile */}
          <div
            className="logo-container"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          >
            <img src={logo} alt="Logo" width="100%" height="100%" />
          </div>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "flex", backgroundColor: "#1976d2" }}
                >
                  {page?.title === "Categories" || page?.title === "Brands" ? (
                    <MultipleSelectCheckmarks
                      icon={page.logo}
                      title={page?.title}
                      brandsForSelectedCategory={brandsForSelectedCategory}
                      // setCategoriesSelected={setCategoriesSelected}
                      setBrandsForSelectedCategory={
                        setBrandsForSelectedCategory
                      }
                    />
                  ) : (
                    <div
                      style={{
                        border: "1px solid red",
                        background: "white",
                        color: "black",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                        padding: "5px",
                      }}
                      onClick={() => {
                        if(state?.userType){
                          dispatch({
                            type: "SetStates",
                            payload: {
                              drawerState: { ...state?.drawerState, right: true },
                            },
                          });
                        }
                        handleCloseUserMenu();
                        // window.open("/profile", "rel=noopener noreferrer");
                      }}
                    >
                      <span>{page?.logo}</span>
                      <span>
                        <div>{totalCartItems} items</div>
                        <div>Rs. {state?.billAmount}</div>
                      </span>
                    </div>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* For desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "flex" }}
              >
                {page?.title === "Categories" || page?.title === "Brands" ? (
                  <MultipleSelectCheckmarks
                    icon={page?.logo}
                    title={page?.title}
                    brandsForSelectedCategory={brandsForSelectedCategory}
                    // setCategoriesSelected={setCategoriesSelected}
                    setBrandsForSelectedCategory={setBrandsForSelectedCategory}
                    // setBrandsSelected={setBrandsSelected}
                  />
                ) : (
                  <div
                    style={{
                      border: "1px solid red",
                      background: "white",
                      color: "black",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      columnGap: "10px",
                      padding: "5px",
                    }}
                    onClick={() => {
                      if(state?.userType){
                        dispatch({
                          type: "SetStates",
                          payload: {
                            drawerState: { ...state?.drawerState, right: true },
                          },
                        });
                      }
                      
                      handleCloseUserMenu();
                      // window.open("/profile", "rel=noopener noreferrer");
                    }}
                  >
                    <span>{page?.logo}</span>
                    <span>
                      <div>{totalCartItems} items</div>
                      <div>Rs. {state?.billAmount}</div>
                    </span>
                  </div>
                )}
              </Button>
            ))}
          </Box>

          {/* Avatar */}
          <Box sx={{ flexGrow: 0 }}>
            {state?.userType === "admin" ? (
              <Button
                variant="container"
                onClick={() => {
                  dispatch({
                    type: "SetStates",
                    payload: {
                      openModal: true,
                    },
                  });
                }}
              >
                Add product
              </Button>
            ) : null}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userItems.map((item) => (
                <MenuItem key={item.title}>
                  {state?.userType ? (
                    item?.title === "Profile" ? (
                      <Typography
                        textAlign="center"
                        onClick={() => {
                          dispatch({
                            type: "SetStates",
                            payload: {
                              drawerState: {
                                ...state?.drawerState,
                                right: true,
                              },
                            },
                          });
                          handleCloseUserMenu();
                          // window.open("/profile", "rel=noopener noreferrer");
                        }}
                      >
                        {item.title}
                      </Typography>
                    ) : item?.title === "Login" ? null : (
                      <Typography
                        textAlign="center"
                        onClick={() => {
                          const callActionTodo = () => {
                            item.action();
                          };
                          callActionTodo();
                          handleCloseUserMenu();
                          // navigate("/");
                          alert("Logged out!");
                        }}
                      >
                        {item.title}
                      </Typography>
                    )
                  ) : item?.title === "Login" ? (
                    <SignIn handleCloseUserMenu={handleCloseUserMenu} />
                  ) : null}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NewNavbar;
