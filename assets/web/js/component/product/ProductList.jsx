import React, { useEffect, useState } from "react";
import { Stack, Typography, CircularProgress, Box } from "@mui/material";
import ProductItem from "./ProductItem.jsx";
import { webApi } from "../../api/index.js";
import Loading from "../common/Loading.jsx";
import CONSTANTS from "../../constant/constants.js";

export default function ProductList({
  onAddToCart,
  selectedCat,
  cart,
  selectedSubCategory,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, [selectedCat, selectedSubCategory]);

  useEffect(() => {
    setProducts((prevProducts) =>
      prevProducts.filter(
        (item) => !item.categories.includes(CONSTANTS.slugCategoryAddOn)
      )
    );
  }, [products]);

  const getProducts = async () => {
    try {
      setLoading(true);
      let categoryId = null;

      if (selectedSubCategory) {
        categoryId = { category_id: selectedSubCategory };
      } else if (selectedCat) {
        categoryId = { category_id: selectedCat };
      }

      const data = await webApi.getProducts(categoryId);
      setProducts(data.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading fullHeight />;
  }

  return (
    <Stack
      spacing={2}
      sx={{
        bgcolor: "#fff",
        padding: 2,
      }}
    >
      {products.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">
          Product not found
        </Typography>
      ) : (
        products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            cart={cart}
          />
        ))
      )}
    </Stack>
  );
}
