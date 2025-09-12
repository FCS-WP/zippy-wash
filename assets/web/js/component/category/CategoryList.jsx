import React, { useEffect, useState } from "react";
import { Stack, Typography, Paper } from "@mui/material";
import { webApi } from "../../api/index.js";
import CategoryItem from "./CategoryItem.jsx";

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
      setCategories(data.data.data);
      setCategoryInfos(data.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
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
      }}
    >
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {/* Nút All */}
        <CategoryItem
          id="all"
          name="All"
          selectedCat={selectedCat}
          onSelect={handleSelectCategory}
        />

        {/* Render categories */}
        {categories.map((cat) => (
          <CategoryItem
            key={cat.id}
            id={cat.id}
            name={cat.name}
            selectedCat={selectedCat}
            onSelect={handleSelectCategory}
          />
        ))}
      </Stack>
    </Paper>
  );
}
