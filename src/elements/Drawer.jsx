import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ShoppingContext } from "../Contexts";

export default function TemporaryDrawer() {
  const [state, dispatch] = useContext(ShoppingContext);
//   const [drawerState, setDrawerState] = useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   useEffect(() => {
//     if (!state?.toggleDrawer) {
//       const toggleDrawer = (anchor, open) => (event) => {
//         if (
//           event.type === "keydown" &&
//           (event.key === "Tab" || event.key === "Shift")
//         ) {
//           return;
//         }

//         setDrawerState({ ...drawerState, [anchor]: open });
//       };
//       dispatch({
//         type: "SetStates",
//         payload: {
//           toggleDrawer: toggleDrawer,
//         },
//       });
//     }
//   }, []);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={() =>
        state?.toggleDrawer ? state?.toggleDrawer(anchor, false) : () => {}}
      onKeyDown={() =>
        state?.toggleDrawer ? state?.toggleDrawer(anchor, false) : () => {}}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={() =>
              state?.toggleDrawer ? state?.toggleDrawer(anchor, true) : () => {}
            }
          >
            {anchor}
          </Button>
          <Drawer
            anchor={anchor}
            open={state?.drawerState[anchor]}
            onClose={() =>
              state?.toggleDrawer ? state?.toggleDrawer(anchor, false) : () => {}
            }
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
