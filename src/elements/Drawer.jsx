import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ShoppingContext } from "../Contexts";
import Profile from "../Profile/Profile";

export default function TemporaryDrawer() {
  const [state, dispatch] = useContext(ShoppingContext);
  const [drawerState, setDrawerState] = useState(false);

  useEffect(() => {
    setDrawerState(state?.drawerState);
  }, [state?.drawerState]);

  return (
    <Drawer
      
      anchor={"right"}
      open={drawerState["right"]}
      onClose={() => {
        dispatch({
          type: "SetStates",
          payload: {
            drawerState: { ...state?.drawerState, right: false },
          },
        });
        setDrawerState({ ...drawerState, right: false });
      }}
    >
      <Profile />
    </Drawer>
  );
}
