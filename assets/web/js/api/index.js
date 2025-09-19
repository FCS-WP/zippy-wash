import { makeOneMapRequest, makeRequest, makeAdminAjaxRequest } from "./axios";

export const webApi = {
  async getCategories(params) {
    return await makeRequest("/zippy-category", params);
  },

  async getProducts(params) {
    return await makeRequest("/zippy-product-by-category", params);
  },

  async addToCart(params) {
    return await makeRequest("/zippy-add-to-cart", params, "POST", true);
  },

  async getProductsInCart(params) {
    return await makeRequest("/zippy-get-product-in-cart", params, "GET", true);
  },

  async updateCartItem(params) {
    return await makeRequest(
      "/zippy-update-quantity-item",
      params,
      "POST",
      true
    );
  },

  async addProductsToCart(params) {
    return await makeRequest(
      "/zippy-add-products-to-cart",
      params,
      "POST",
      true
    );
  },

  async removeCartItem(params) {
    return await makeRequest("/zippy-remove-cart-item", params, "POST", true);
  },

  async getCoupons(params) {
    return await makeRequest("/zippy-get-coupons", params, "GET", true);
  },

  async applyCouponToCart(params) {
    return await makeRequest(
      "/zippy-apply-coupon-to-cart",
      params,
      "POST",
      true
    );
  },

  async getCartInfoAppliedCoupon(params) {
    return await makeRequest(
      "/zippy-get-cart-info-applied-coupon",
      params,
      "GET",
      true
    );
  },

  async removeCoupon(params) {
    return await makeRequest(
      "/zippy-remove-coupon-from-cart",
      params,
      "POST",
      true
    );
  },
};
