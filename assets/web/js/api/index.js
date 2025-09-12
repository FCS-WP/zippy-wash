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

  async getCartItemsAjax() {
    const params = new URLSearchParams();
    params.append("action", "get_product_in_cart");

    return await makeAdminAjaxRequest(params, "POST");
  },
};
