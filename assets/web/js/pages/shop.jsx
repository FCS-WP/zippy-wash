import React, { useEffect, useState } from "react";
import { Grid2, Paper, Typography, Box } from "@mui/material";
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

  const handleAddToCart = async (product, qty = 1) => {
    try {
      setCart((prev) => {
        const exist = prev.find((item) => item.id === product.id);

        if (exist) {
          handleRemove(exist.cart_item_key);
          return prev.filter((item) => item.id !== product.id);
        } else {
          (async () => {
            const res = await webApi.addToCart({
              product_id: product.id,
              qty,
            });

            if (res?.data?.status == "success") {
              const addedProduct = res?.data?.data;
              document.body.dispatchEvent(
                new Event("wc_fragment_refresh", { bubbles: true })
              );

              setCart((prevCart) => [
                ...prevCart,
                { ...product, qty, cart_item_key: addedProduct?.cart_item_key },
              ]);
            }
          })();

          return prev;
        }
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateCartItem = async (cart_item_key, qty) => {
    try {
      const res = await webApi.updateCartItem({ cart_item_key, qty });
      if (res?.data?.status == "success") {
        document.body.dispatchEvent(
          new Event("wc_fragment_refresh", { bubbles: true })
        );
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleUpdateQty = (product, qty) => {
    handleUpdateCartItem(product.cart_item_key, qty);
    setCart((prev) =>
      prev
        .map((item) => (item.id === product.id ? { ...item, qty } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemove = async (cart_item_key) => {
    await handleRemoveByCartItemKey(cart_item_key);
    setCart((prev) =>
      prev.filter((item) => item.cart_item_key !== cart_item_key)
    );
  };

  const handleRemoveByCartItemKey = async (cart_item_key) => {
    try {
      const res = await webApi.removeCartItem({ cart_item_key });
      if (res?.data?.status == "success") {
        document.body.dispatchEvent(
          new Event("wc_fragment_refresh", { bubbles: true })
        );
      }
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
        py: 4,
        px: { xs: 0, sm: 2, md: 6, lg: 8, xl: 20 },
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
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        <Grid2 size={{ xs: 12, md: 12, lg: 12, xl: 8 }}>
          <ProductList
            onAddToCart={handleAddToCart}
            selectedCat={selectedCat}
            cart={cart}
            selectedSubCategory={selectedSubCategory}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 12, lg: 12, xl: 4 }}>
          <Cart
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemove}
            setCart={setCart}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
