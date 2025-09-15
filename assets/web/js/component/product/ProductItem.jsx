import React from "react";
import { Paper, Typography, Stack, Button, Box } from "@mui/material";

export default function ProductItem({ product, onAddToCart, cart }) {
  const inCart = cart?.some((item) => item.id === product.id);
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#ffffffff",
        cursor: "pointer",
        border: inCart ? "2px solid #F04150" : "2px solid transparent",
        borderRadius: 2,
        ":hover": { bgcolor: "#f0f0f0" },
        elevation: 3,
        gap: 2,
      }}
      onClick={() => onAddToCart(product)}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Ảnh */}
        <Box
          component="img"
          src={product.img}
          alt={product.name}
          sx={{ width: 80, height: 80, objectFit: "contain", borderRadius: 1 }}
        />
        <Stack spacing={0.5}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
            }}
          >
            {product.desc}
          </Typography>

          <Typography
            variant="caption"
            color="primary"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" } }}
          >
            {product.categories.join(", ")}
          </Typography>
        </Stack>
      </Stack>

      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.95rem" } }}
      >
        ${product.price}
      </Typography>
    </Paper>
  );
}
