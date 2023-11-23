import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useContext } from "react";
import { ShoppingContext } from "../Contexts";

export default function ProductCard({
  photo,
  title,
  brand,
  description,
  price,
  stock,
  discountPercentage,
  thumbnail,
  id,
}) {
  const [state, dispatch] = useContext(ShoppingContext);
  return (
    <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src={photo}
            // srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">{title}</Typography>
        <Typography level="body-md">{description}</Typography>
        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: "xl" }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              Lowest price- Rs.{price}
            </Chip>
          }
        >
          {discountPercentage}% Off
        </Typography>
        {state?.products[id - 1]?.stock > 0 ? (
          <Typography level="body-sm">
            (Only <b>{stock}</b> left in stock!)
          </Typography>
        ) : null}
      </CardContent>
      <div className="card-bottom-content">
        <img src={thumbnail} alt="" width="50px" height="50px" />
        <Typography level="body-sm">{brand}</Typography>
        {state?.products[id - 1]?.stock > 0 ? (
          <div className="card-bottom-buttons">
            {state?.cartItems[id] > 0 ? (
              <Button
                variant="solid"
                color="danger"
                size="lg"
                onClick={() => {
                  let cartItems = state?.cartItems;
                  cartItems[id] = cartItems[id] - 1;
                  let billAmount = state?.billAmount;
                  billAmount = billAmount - price;
                  dispatch({
                    type: "SetStates",
                    payload: {
                      cartItems: cartItems,
                      billAmount: billAmount,
                    },
                  });
                }}
              >
                -
              </Button>
            ) : null}
            {state?.cartItems[id] > 0 ? state?.cartItems[id] : null}
            <Button
              variant="solid"
              color="danger"
              size="lg"
              onClick={(e) => {
                // console.log(id, e.target)
                let cartItems = state?.cartItems;
                let billAmount = state?.billAmount;
                if (cartItems[id] < stock) {
                  cartItems[id] = cartItems[id] + 1;
                  billAmount = billAmount + price;
                  dispatch({
                    type: "SetStates",
                    payload: {
                      cartItems: cartItems,
                      billAmount: billAmount,
                    },
                  });
                }
              }}
            >
              +
            </Button>
          </div>
        ) : (
          <h4>Out of Stock</h4>
        )}
      </div>
    </Card>
  );
}
