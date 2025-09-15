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

  const handleAddToCart = async (product, qty) => {
    try {
      const res = await webApi.addToCart({
        product_id: product.id,
        qty: qty || 1,
      });
      const addedProduct = res?.data?.data?.[0];
      setCart((prev) => {
        const exist = prev.find((item) => item.id === product.id);
        if (exist) {
          return prev.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  qty: item.qty + 1,
                  cart_item_key: addedProduct?.cart_item_key,
                }
              : item
          );
        }
        return [
          ...prev,
          { ...product, qty: 1, cart_item_key: addedProduct?.cart_item_key },
        ];
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  const handleUpdateCartItem = async (cart_item_key, qty) => {
    try {
      await webApi.updateCartItem({ cart_item_key, qty });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleUpdateQty = (product, qty) => {
    handleUpdateCartItem(product.cart_item_key, qty);
    setCart((prev) =>
      prev
        .map((item) => (item.id === product.id ? { ...item, qty: qty } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemove = (cart_item_key) => {
    handleRemoveByCartItemKey(cart_item_key);
    setCart((prev) =>
      prev.filter((item) => item.cart_item_key !== cart_item_key)
    );
  };

  const handleRemoveByCartItemKey = async (cart_item_key) => {
    try {
      await webApi.removeCartItem({ cart_item_key });
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
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
