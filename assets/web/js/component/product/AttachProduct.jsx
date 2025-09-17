import React, { useEffect, useState } from "react";
import { Paper, Typography, Stack, IconButton, Box } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { webApi } from "../../api";
import CONSTANTS from "../../constant/constants";
import theme from "../../../theme/customTheme";

export default function AttachProduct(props) {
  const { products, setProducts, onAddToCart, cart } = props;
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data: res } = await webApi.getProducts({
        category_slug: CONSTANTS.slugCategoryAddOn,
      });
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const onRemove = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: 2,
        bgcolor: "#fff",
        py: 2,
        overflowX: "auto",
        "&::-webkit-scrollbar": { height: 6 },
        "&::-webkit-scrollbar-thumb": { background: "#ccc", borderRadius: 3 },
      }}
    >
      {products.map((product) => {
        const inCart = cart?.some((item) => item.id === product.id);

        return (
          <Paper
            elevation={0}
            key={product.id}
            sx={{
              p: 1.5,
              bgcolor: "#fff",
              cursor: "pointer",
              ":hover": { bgcolor: "#f0f0f0" },
              width: 300,
              border: inCart
                ? `1px solid ${theme.palette.primary.mainRed}`
                : "1px solid #e6e6e6ff",
            }}
            onClick={() => onAddToCart(product)}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={6}
            >
              <Stack spacing={0.3} sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" fontWeight="bold" noWrap>
                  {product.name}
                </Typography>

                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography
                    variant="h6"
                    fontWeight="regular"
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.95rem" },
                    }}
                    dangerouslySetInnerHTML={{
                      __html: product.formatted_price,
                    }}
                  />
                </Stack>
              </Stack>

              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(product.id);
                }}
                sx={{ color: theme.palette.primary.mainRed }}
              >
                <ArrowForward fontSize="small" />
              </IconButton>
            </Stack>
          </Paper>
        );
      })}
    </Box>
  );
}
