import React, { useEffect, useState } from "react";
import { Stack, Typography, Paper, Avatar, Box } from "@mui/material";
import CategoryItem from "./CategoryItem.jsx";

export default function CategoryInfo({
  categories,
  selectedCat,
  onSubCategoryChange,
  selectedSubCategory,
}) {
  if (!categories || categories.length === 0 || !selectedCat) {
    return null;
  }

  const category = categories.find((cat) => cat.id === selectedCat);

  if (!category) {
    return null;
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        mb: 3,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {category.name}
          </Typography>
          {category.description && (
            <Typography variant="body2" color="text.secondary">
              {category.description}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            {category.count} products
          </Typography>
        </Box>

        {category.img && (
          <Avatar
            src={category.img}
            alt={category.name}
            sx={{ width: 60, height: 60 }}
            variant="rounded"
          />
        )}
      </Stack>

      {category.children && category.children.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              id={child.id}
              name={child.name}
              selectedCat={selectedSubCategory}
              onSelect={onSubCategoryChange}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
}
