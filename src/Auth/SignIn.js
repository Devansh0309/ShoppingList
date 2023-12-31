import { useContext, useState } from "react";
import {
  auth,
  signInWithPopup,
  GoogleAuthProvider,
  db,
} from "../firebaseConfigs/firebaseConfigs";
import { ShoppingContext } from "../Contexts";
import { Typography } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function SignIn({ handleCloseUserMenu }) {
  // console.log(ShoppingContext)
  const [state, dispatch] = useContext(ShoppingContext);
  const provider = new GoogleAuthProvider();

  const signIn = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        // console.log(result)
        const user = result.user.uid;
        const adminEmail = result.user.email
        let admins = state?.admin
        // console.log(user);
        if (admins?.includes(adminEmail)) {

          if (!state?.uid || state?.uid !== user) {
            let cartItems = {};
            for (let product of state?.products) {
              cartItems[product.id] = 0;
            }
            dispatch({
              type: "SetStates",
              payload: {
                userType: "admin",
                openModal: true,
                cartItems: cartItems,
                billAmount: 0,
                uid: user,
              },
            });
          } else {
            dispatch({
              type: "SetStates",
              payload: { userType: "admin", openModal: true },
            });
          }
          alert("Logged in as admin!")
        } else if (!state?.uid || state?.uid !== user) {

          let cartItems = {};
          for (let product of state?.products) {
            cartItems[product.id] = 0;
          }
          dispatch({
            type: "SetStates",
            payload: { userType: "customer" },
          });

          const temp = async () => {
            const docRef = doc(db, "products", "customers");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const data = docSnap.data();
              // console.log("Document data:", data);
              if (!data[user]) {
                await updateDoc(docRef, {
                  [user]: {
                    uid: user,
                  },
                });
              }
              dispatch({
                type: "SetStates",
                payload: {
                  cartItems: cartItems,
                  billAmount: 0,
                  uid: user,
                },
              });
              alert("Logged in!")
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
              alert("Some error!")
            }
          };
          temp();
        } else {
          dispatch({
            type: "SetStates",
            payload: { userType: "customer" },
          });
          alert("Logged in!")
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <Typography
        textAlign="center"
        onClick={() => {
          signIn();
          handleCloseUserMenu();
        }}
      >
        Login
      </Typography>
    </div>
  );
}
export default SignIn;
