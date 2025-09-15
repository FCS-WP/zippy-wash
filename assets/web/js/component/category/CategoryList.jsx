import React, { useEffect, useState } from "react";
import { Stack, Typography, Paper } from "@mui/material";
import { webApi } from "../../api/index.js";
import CategoryItem from "./CategoryItem.jsx";
import theme from "../../../theme/customTheme.js";

export default function CategoryList({ onCategoryChange, setCategoryInfos }) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && selectedCat === null) {
      setSelectedCat("all");
    }
  }, [categories]);

  const getCategories = async () => {
    try {
      const data = await webApi.getCategories();
      const categories = data?.data?.data || [];
      setCategories(categories);
      setCategoryInfos(categories);

      if (filterByQueryCategory(categories)) {
        return;
      }

      setSelectedCat("all");
      onCategoryChange(null);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filterByQueryCategory = (categories) => {
    const params = new URLSearchParams(window.location.search);
    const categorySlug = params.get("category");
    if (categorySlug) {
      const category = categories.find((cat) => cat.slug === categorySlug);
      if (category) {
        setSelectedCat(category.id);
        onCategoryChange(category.id);
        return true;
      }
    }

    return false;
  };

  const handleSelectCategory = (catId) => {
    setSelectedCat(catId);
    onCategoryChange(catId === "all" ? null : catId);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        mb: 3,
        bgcolor: "#007f5b",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
        Categories
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          py: 1,
        }}
      >
        {/* Nút All */}
        <CategoryItem
          id="all"
          name="All"
          selectedCat={selectedCat}
          onSelect={handleSelectCategory}
          bgcolor={theme.palette.primary.main}
          colorText={theme.palette.text.primary}
          colorTextHover={theme.palette.text.primary}
          bgcolorHover={theme.palette.hover.main}
        />

        {/* Render categories */}
        {categories.map((cat) => (
          <CategoryItem
            key={cat.id}
            id={cat.id}
            name={cat.name}
            selectedCat={selectedCat}
            onSelect={handleSelectCategory}
            bgcolor={theme.palette.primary.main}
            colorText={theme.palette.text.primary}
            colorTextHover={theme.palette.text.primary}
            bgcolorHover={theme.palette.hover.main}
          />
        ))}
      </Stack>
    </Paper>
  );
}
