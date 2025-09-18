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
import theme from "../../../theme/customTheme.js";

export default function Cart(props) {
  const { cart, setCart, onUpdateQty, onRemove } = props;
  const [availableProductInCart, setAvailableProductInCart] = useState();
  const [total, setTotal] = useState(0);

  // Fetch products in cart
  useEffect(() => {
    getProductsInCart();
  }, []);

  // Set products in cart to cart state
  useEffect(() => {
    if (!availableProductInCart) return;
    setCart(availableProductInCart);
  }, [availableProductInCart]);

  // Calculate total when add to cart, remove, update qty
  useEffect(() => {
    const total = calculateTotal(cart);
    setTotal(total);
  }, [cart]);

  const placeOrder = async () => {
    window.location.href = "/checkout";
  };

  const calculateTotal = (cart) => {
    return cart
      .reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const qty = Number(item.quantity) || 1;
        const lineTotal = price * qty;
        return sum + lineTotal;
      }, 0)
      .toFixed(2);
  };

  const getProductsInCart = async () => {
    try {
      const data = await webApi.getProductsInCart();
      setAvailableProductInCart(data.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setAvailableProductInCart();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: 2, borderRadius: 2, border: "1px solid #dbdbdbff" }}
    >
      <Stack divider={<Divider />} spacing={0}>
        {/* Part 1 */}
        <Box sx={{ py: 1 }}>
          <Typography variant="h6" gutterBottom>
            {cart?.length} services selected
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
                  onClick={() => onUpdateQty(item, item.quantity - 1)}
                  sx={{
                    "&:focus": {
                      backgroundColor: theme.palette.primary.mainRed,
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.primary.mainRed,
                    },
                  }}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => onUpdateQty(item, item.quantity + 1)}
                  sx={{
                    "&:focus": {
                      backgroundColor: theme.palette.primary.mainRed,
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.primary.mainRed,
                    },
                  }}
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
                <Typography
                  sx={{ textAlign: "right", minWidth: 50 }}
                  dangerouslySetInnerHTML={{ __html: item.formatted_price }}
                />
                <IconButton
                  size="small"
                  onClick={() => onRemove(item.cart_item_key)}
                  sx={{ color: theme.palette.primary.mainRed }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </Stack>

        {/* Part 3: Total + Button */}
        <Box sx={{ py: 1 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Estimated price: ${total}
          </Typography>
          <Button
            id="schedule-order-button"
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
