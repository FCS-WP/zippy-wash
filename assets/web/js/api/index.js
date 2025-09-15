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

  async removeCartItem(params) {
    return await makeRequest("/zippy-remove-cart-item", params, "POST", true);
  },
};
