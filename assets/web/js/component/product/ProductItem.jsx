import React from "react";
import { Paper, Typography, Stack, Box, Tooltip } from "@mui/material";
import theme from "../../../theme/customTheme";

export default function ProductItem({ product, onAddToCart, cart }) {
  const inCart = cart?.some((item) => item.id === product.id);
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#ffffffff",
        cursor: "pointer",
        border: inCart ? "2px solid #F04150" : "1px solid #e6e6e6ff",
        borderRadius: 2,
        ":hover": { bgcolor: "#f0f0f0" },
        gap: "50px",
        mb: "10px",
      }}
      onClick={() => onAddToCart(product)}
    >
      <Stack direction="row" spacing={2} alignItems="center" gap={2}>
        {/* <Box
          component="img"
          src={product.img}
          alt={product.name}
          sx={{ width: 80, height: 80, objectFit: "contain", borderRadius: 1 }}
        /> */}
        <Stack spacing={0.5} flex={1} minWidth={0}>
          <Tooltip title={product.name} arrow>
            <Typography
              variant="caption"
              fontWeight="bold"
              sx={{
                flexShrink: 1,
                minWidth: 0,
                maxWidth: {
                  lg: "700px",
                  md: "600px",
                  sm: "300px",
                  xs: "200px",
                },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: { xs: "0.7rem", sm: "1rem", md: "1.1rem" },
              }}
            >
              {product.name}
            </Typography>
          </Tooltip>

          <Tooltip title={product.desc} arrow>
            <Typography
              variant="caption"
              sx={{
                flexShrink: 1,
                minWidth: 0,
                maxWidth: {
                  lg: "700px",
                  md: "600px",
                  sm: "300px",
                  xs: "200px",
                },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
              }}
            >
              {product.desc}
            </Typography>
          </Tooltip>

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
