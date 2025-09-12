import React from "react";
import { Paper, Typography, Stack, Button, Box } from "@mui/material";

export default function ProductItem({ product, onAddToCart, cart }) {
  const inCart = cart.some((item) => item.id === product.id);
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#ffffffff",
        cursor: "pointer",
        border: inCart ? "2px solid #1976d2" : "2px solid transparent",
        borderRadius: 2,
        ":hover": { bgcolor: "#f0f0f0" },
        elevation: 3,
        gap: 2,
      }}
      onClick={() => onAddToCart(product)}
    >
      {/* Bên trái: ảnh + nội dung */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Ảnh */}
        <Box
          component="img"
          src={product.img}
          alt={product.name}
          sx={{ width: 80, height: 80, objectFit: "contain", borderRadius: 1 }}
        />
        {/* Nội dung */}
        <Stack spacing={0.5}>
          <Typography variant="subtitle1" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {product.desc}
          </Typography>
          <Typography variant="caption" color="primary">
            {product.categories.join(", ")}
          </Typography>
        </Stack>
      </Stack>

      {/* Bên phải: giá */}
      <Typography variant="h6" fontWeight="bold">
        ${product.price}
      </Typography>
    </Paper>
  );
}
