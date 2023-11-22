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
        const user = result.user.uid;
        console.log(user);
        if (state?.admin?.includes(user)) {
          dispatch({
            type: "SetStates",
            payload: { userType: "admin" },
          });
        } else {
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
                    // billAmount: state?.billAmount,
                    // cartItems: state?.cartItems,
                    uid: user,
                  },
                });
              }
              dispatch({
                type: "SetStates",
                payload: { uid: user},
              });
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
            }
          };
          temp();
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
