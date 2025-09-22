import React, { useEffect, useState } from "react";
import { Grid2, Paper, Typography, Box, Stack } from "@mui/material";
import CategoryList from "../component/category/CategoryList.jsx";
import ProductList from "../component/product/ProductList.jsx";
import Cart from "../component/cart/Cart.jsx";
import CategoryInfo from "../component/category/CategoryInfo.jsx";
import { webApi } from "../api/index.js";
import ListSubCategory from "../component/category/ListSubCategory.jsx";
import AttachProduct from "../component/product/AttachProduct.jsx";
import CouponList from "../component/coupon/CouponList.jsx";

export default function Shop() {
  const [cart, setCart] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [category, setCategory] = useState([]);
  const [productAttachs, setProductAttachs] = useState([]);
  const [cartAppliedCoupon, setCartAppliedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);

  //Set current category
  useEffect(() => {
    if (!selectedCat || !categories) {
      setCategory(null);
      return;
    }

    const category = categories.find((cat) => cat.id === selectedCat);
    setCategory(category);
  }, [selectedCat]);

  useEffect(() => {
    setSelectedSubCategory(null);
  }, [selectedCat]);

  useEffect(() => {
    getCoupons();
    getCartInfoAppliedCoupon();
  }, []);

  const getCoupons = async () => {
    try {
      const { data: res } = await webApi.getCoupons({
        user_id: admin_data.userID,
      });
      setCoupons(res.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getCartInfoAppliedCoupon = async () => {
    const { data: res } = await webApi.getCartInfoAppliedCoupon();
    if (res.status === "success") {
      setCartAppliedCoupon(res.data);
    }
  };

  const handleAddToCart = async (product, quantity = 1) => {
    try {
      const exist = cart.find((item) => item.id === product.id);

      if (exist) {
        await handleRemove(exist.cart_item_key);
        setCart((prev) => prev.filter((item) => item.id !== product.id));
      } else {
        const res = await webApi.addToCart({
          product_id: product.id,
          quantity,
        });

        if (res?.data?.status === "success") {
          const addedProduct = res?.data?.data;

          document.body.dispatchEvent(
            new Event("wc_fragment_refresh", { bubbles: true })
          );

          setCart((prevCart) => [
            ...prevCart,
            {
              ...product,
              quantity,
              cart_item_key: addedProduct?.cart_item_key,
            },
          ]);
        }
      }
      await getCoupons();
      await getCartInfoAppliedCoupon();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateCartItem = async (cart_item_key, quantity) => {
    try {
      const res = await webApi.updateCartItem({ cart_item_key, quantity });
      if (res?.data?.status == "success") {
        document.body.dispatchEvent(
          new Event("wc_fragment_refresh", { bubbles: true })
        );
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleUpdateQty = (product, quantity) => {
    if (quantity < 1) {
      handleRemove(product.cart_item_key);
      return;
    }

    handleUpdateCartItem(product.cart_item_key, quantity);
    setCart((prev) =>
      prev
        .map((item) => (item.id === product.id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
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

  return (
    <Box
      className="shop-page"
      sx={{
        bgcolor: "#ffffffff",
        minHeight: "100vh",
        py: { xs: 0, sm: 2, md: 4, lg: 4, xl: 4 },
        px: { xs: 2, sm: 2, md: 6, lg: 8, xl: 20 },
      }}
    >
      {/* Category */}
      <CategoryList
        onCategoryChange={setSelectedCat}
        setCategoryInfos={setCategories}
      />

      <CategoryInfo categories={categories} selectedCat={selectedCat} />

      {/* Sub Category */}
      <ListSubCategory
        category={category}
        setSelectedSubCategory={setSelectedSubCategory}
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

          <AttachProduct
            products={productAttachs}
            setProducts={setProductAttachs}
            onAddToCart={handleAddToCart}
            cart={cart}
          />

          <CouponList
            cartAppliedCoupon={cartAppliedCoupon}
            setCartAppliedCoupon={setCartAppliedCoupon}
            coupons={coupons}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 12, lg: 12, xl: 4 }}>
          <Cart
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemove}
            setCart={setCart}
            cartAppliedCoupon={cartAppliedCoupon}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
