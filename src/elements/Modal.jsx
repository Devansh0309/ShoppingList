import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import { useContext } from "react";
import { ShoppingContext } from "../Contexts";
import { db } from "../firebaseConfigs/firebaseConfigs";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export default function ProductModal() {
  const [state, dispatch] = useContext(ShoppingContext);
  const [productDetails, setProductDetails] = useState({
    images: "",
    title: "",
    category: "",
    brand: "",
    description: "",
    price: 0,
    stock: 0,
    discountPercentage: 0,
    thumbnail: "",
  });
  return (
    <React.Fragment>
      <Modal
        open={state?.openModal}
        onClose={() =>
          dispatch({
            type: "SetStates",
            payload: {
              openModal: false,
            },
          })
        }
      >
        <ModalDialog>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const temp = async () => {
                const docRef = doc(db, "products", "l8FKZZhmlnEbGTnWy65n");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                  console.log("line 96");
                  const data = docSnap.data();
                  let products = data["$return_value"];
                  products.push({ ...productDetails, id: products.length + 1 });
                  await updateDoc(docRef, {
                    $return_value: products,
                  })
                    .then(() => {
                      console.log("line 55", "doc updated");
                    })
                    .catch((err) => {
                      console.log("line 58", err);
                    });
                }
              };
              temp();
              dispatch({
                type: "SetStates",
                payload: {
                  openModal: false,
                },
              });
            }}
          >
            <Stack spacing={0.5}>
              <FormControl>
                <FormLabel>Photo link</FormLabel>
                <Input
                  autoFocus
                  required
                  onChange={(e) => {
                    let prop = [e.target.value];

                    setProductDetails({ ...productDetails, images: prop });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  autoFocus
                  required
                  onChange={(e) => {
                    let prop = e.target.value;
                    setProductDetails({ ...productDetails, title: prop });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input
                  autoFocus
                  required
                  onChange={(e) => {
                    let prop = e.target.value;
                    setProductDetails({ ...productDetails, category: prop });
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Brand</FormLabel>
                <Input
                  autoFocus
                  required
                  onChange={(e) => {
                    let prop = e.target.value;
                    setProductDetails({ ...productDetails, brand: prop });
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  autoFocus
                  required
                  onChange={(e) => {
                    let prop = e.target.value;
                    setProductDetails({ ...productDetails, description: prop });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price value in Rs.</FormLabel>
                <Input
                  autoFocus
                  required
                  onChange={(e) => {
                    let prop = e.target.value;
                    setProductDetails({ ...productDetails, price: prop });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Stock(number)</FormLabel>
                <Input
                  autoFocus
                  required
                  onChange={(e) => {
                    let prop = e.target.value;
                    setProductDetails({ ...productDetails, stock: prop });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Discount %(number only)</FormLabel>
                <Input
                  autoFocus
                  required
                  onChange={(e) => {
                    let prop = e.target.value;
                    setProductDetails({
                      ...productDetails,
                      discountPercentage: prop,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Thumbnail link</FormLabel>
                <Input
                  autoFocus
                  required
                  onChange={(e) => {
                    let prop = e.target.value;
                    setProductDetails({ ...productDetails, thumbnail: prop });
                  }}
                />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
