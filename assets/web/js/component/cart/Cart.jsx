import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  IconButton,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import AttachProduct from "../product/AttachProduct.jsx";
import { webApi } from "../../api/index.js";
import Loading from "../common/Loading.jsx";
import CONSTANTS from "../../constant/constants.js";

export default function Cart({ cart, setCart, onUpdateQty, onRemove }) {
  const [productInCart, setProductInCart] = useState();
  const [productAttachs, setProductAttachs] = useState([]);
  const [availableProductInCart, setAvailableProductInCart] = useState();

  const total = [...cart, ...productAttachs].reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;
    return sum + price * qty;
  }, 0);

  const placeOrder = async () => {
    try {
      // const productsToSend = [
      //   ...cart,
      //   ...productAttachs.map((item) => ({ ...item, qty: item.qty || 1 })),
      // ];

      // await webApi.addToCart({ products: productsToSend });
      window.location.href = "/checkout";
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    getProductsInCart();
  }, []);

  const getProductsInCart = async () => {
    try {
      const data = await webApi.getProductsInCart();
      setAvailableProductInCart(data.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setAvailableProductInCart();
    }
  };

  useEffect(() => {
    if (!availableProductInCart) return;

    const merged = [...cart];

    availableProductInCart
      .filter((item) => !item.categories.includes(CONSTANTS.slugCategoryAddOn))
      .forEach((item) => {
        const index = merged.findIndex((c) => c.id === item.id);
        if (index > -1) {
          merged[index] = {
            ...merged[index],
            qty: merged[index].qty + item.quantity,
            price: item.price,
          };
        } else {
          merged.push({
            ...item,
            qty: item.quantity,
          });
        }
      });

    setCart(merged);
  }, [availableProductInCart]);

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Stack divider={<Divider />} spacing={0}>
        {/* Part 1 */}
        <Box sx={{ py: 1 }}>
          <Typography variant="h6" gutterBottom>
            {cart.length} services selected
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography variant="body1">
              Do I need to list every item?
            </Typography>
            <a href="#" style={{ textDecoration: "none", color: "#F04150" }}>
              Learn more
            </a>
          </Box>
        </Box>

        {/* Part 2: List items */}
        <Stack spacing={1} sx={{ py: 1 }}>
          {cart?.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Box sx={{ width: 160, flexShrink: 0 }}>
                <Typography noWrap>{item.name}</Typography>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ flex: 1, justifyContent: "center" }}
              >
                <IconButton
                  size="small"
                  onClick={() => onUpdateQty(item.id, item.qty - 1)}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <Typography>{item.qty}</Typography>
                <IconButton
                  size="small"
                  onClick={() => onUpdateQty(item.id, item.qty + 1)}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ width: 120, justifyContent: "flex-end" }}
              >
                <Typography sx={{ textAlign: "right", minWidth: 50 }}>
                  ${item.price * item.qty}
                </Typography>
                <IconButton size="small" onClick={() => onRemove(item.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <AttachProduct
          products={productAttachs}
          setProducts={setProductAttachs}
        />

        {/* Part 3: Total + Button */}
        <Box sx={{ py: 1 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Estimated price: ${total}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#F04150",
              color: "#fff",
              ":hover": { bgcolor: "#d82e3cff" },
            }}
            onClick={() => placeOrder()}
          >
            SCHEDULE AN ORDER
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
