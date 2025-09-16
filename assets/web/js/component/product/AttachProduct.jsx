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
import { Delete } from "@mui/icons-material";
import { webApi } from "../../api";
import CONSTANTS from "../../constant/constants";
import theme from "../../../theme/customTheme";

export default function AttachProduct({ products, setProducts }) {
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
    <Stack
      spacing={2}
      sx={{
        bgcolor: "#ffffffff",
      }}
    >
      {products.map((product) => (
        <Paper
          key={product.id}
          sx={{
            p: 1.5,
            bgcolor: "#ffffffff",
            cursor: "pointer",
            ":hover": { bgcolor: "#f0f0f0" },
          }}
        >
          <Box
            component="img"
            src={product.img}
            alt={product.name}
            sx={{
              width: 35,
              height: 35,
              objectFit: "cover",
              borderRadius: "50%",
              mb: 1,
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              spacing={0.3}
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" noWrap>
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
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.95rem" } }}
                dangerouslySetInnerHTML={{ __html: product.formatted_price }}
              />
              <IconButton
                size="small"
                onClick={() => onRemove(product.id)}
                sx={{ color: theme.palette.primary.mainRed }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
