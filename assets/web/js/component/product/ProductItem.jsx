import React from "react";
import { Paper, Typography, Stack, Box } from "@mui/material";
import theme from "../../../theme/customTheme";

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
        gap: "50px",
        minHeight: 150,
      }}
      onClick={() => onAddToCart(product)}
    >
      <Stack direction="row" spacing={2} alignItems="center" gap={2}>
        <Box
          component="img"
          src={product.img}
          alt={product.name}
          sx={{ width: 80, height: 80, objectFit: "contain", borderRadius: 1 }}
        />
        <Stack spacing={0.5} flex={1} minWidth={0}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}
            noWrap
          >
            {product.name}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
              height: 40,
              overflow: "hidden",
            }}
          >
            {product.desc}
          </Typography>

          <Typography
            variant="caption"
            fontWeight="bold"
            color={theme.palette.primary.mainRed}
            sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" } }}
          >
            {product.category_names.join(", ")}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.95rem" } }}
        dangerouslySetInnerHTML={{ __html: product.formatted_price }}
      />
    </Paper>
  );
}
