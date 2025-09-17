import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import ProductItem from "./ProductItem.jsx";
import { webApi } from "../../api/index.js";
import Loading from "../common/Loading.jsx";
import CONSTANTS from "../../constant/constants.js";
import theme from "../../../theme/customTheme.js";
import CustomPagination from "../common/CustomPagination.jsx";

export default function ProductList(props) {
  const { onAddToCart, selectedCat, cart, selectedSubCategory } = props;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    setPage(1);
  }, [selectedCat, selectedSubCategory]);

  useEffect(() => {
    getProducts();
  }, [selectedCat, selectedSubCategory, page]);

  const getProducts = async () => {
    try {
      setLoading(true);
      let params = { limit, page };
      if (selectedSubCategory) {
        params.category_id = selectedSubCategory;
      } else if (selectedCat) {
        params.category_id = selectedCat;
      }

      const { data: res } = await webApi.getProducts(params);

      const filteredProducts = (res.data.products || []).filter(
        (item) => !item.categories.includes(CONSTANTS.slugCategoryAddOn)
      );

      setProducts(filteredProducts);
      setTotalPages(res.data.total_pages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {loading ? (
        <Loading fullHeight />
      ) : products.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">
          Product not found
        </Typography>
      ) : (
        <>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              cart={cart}
            />
          ))}
          <CustomPagination
            page={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}
