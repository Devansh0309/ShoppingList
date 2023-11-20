import { useContext, useState } from "react";
import {
  auth,
  signInWithPopup,
  GoogleAuthProvider,
} from "../firebaseConfigs/firebaseConfigs";
import { ShoppingContext } from "../Contexts";

async function SignIn() {
  // console.log(ShoppingContext)
  const [state, dispatch ] = useContext(ShoppingContext);
  const provider = new GoogleAuthProvider();
  // const signIn = async()=>{
    await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user.uid;
      if (user === "g23bixOpt8YpSFI6emQTuie8SFo1") {
        dispatch({
          type: "SetStates",
          payload: { userType: "admin" },
        });
      } else {
        dispatch({
          type: "SetStates",
          payload: { userType: "customer" },
        });
      }
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  // }
  // signIn()
  // signIn()
  // return (
  //   <div>
  //     <button
  //       onClick={() => {
  //         signIn()
  //       }}
  //     >
  //       SignIn
  //     </button>
  //   </div>
  // );
}
export default SignIn
