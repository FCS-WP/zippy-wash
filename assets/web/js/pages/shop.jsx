import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import CategoryList from "../component/category/CategoryList.jsx";
import ProductList from "../component/product/ProductList.jsx";
import Cart from "../component/cart/Cart.jsx";
import CategoryInfo from "../component/category/CategoryInfo.jsx";
import { webApi } from "../api/index.js";

export default function Shop() {
  const [cart, setCart] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleAddToCart = async (product) => {
    try {
      // Gửi 1 sản phẩm đang chọn lên backend
      await webApi.addToCart({ products: [{ ...product, qty: 1 }] });
      // Cập nhật cart ở frontend nếu muốn
      setCart((prev) => {
        const exist = prev.find((item) => item.id === product.id);
        if (exist) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateQty = (id, qty) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: qty } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setSelectedSubCategory(null);
  }, [selectedCat]);

  return (
    <Box
      className="shop-page"
      sx={{
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
        p: 3,
      }}
    >
      {/* Category */}
      <CategoryList
        onCategoryChange={setSelectedCat}
        setCategoryInfos={setCategories}
      />

      <CategoryInfo
        categories={categories}
        selectedCat={selectedCat}
        onSubCategoryChange={setSelectedSubCategory}
        selectedSubCategory={selectedSubCategory}
      />

      {/* Product List + Cart */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <ProductList
            onAddToCart={handleAddToCart}
            selectedCat={selectedCat}
            cart={cart}
            selectedSubCategory={selectedSubCategory}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Cart
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemove}
            setCart={setCart}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
