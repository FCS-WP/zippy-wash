import React, { useEffect, useState } from "react";
import { Stack, Typography, Paper, Avatar, Box } from "@mui/material";
import CategoryItem from "./CategoryItem.jsx";
import theme from "../../../theme/customTheme.js";

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
        bgcolor: theme.palette.primary.main,
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
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mt: 2,
            py: 1,
            overflowX: "auto",
            whiteSpace: "nowrap",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {category.children.map((child) => (
            <Box key={child.id} sx={{ display: "inline-block" }}>
              <CategoryItem
                id={child.id}
                name={child.name}
                selectedCat={selectedSubCategory}
                onSelect={onSubCategoryChange}
                bgcolor={theme.palette.primary.mainGreen}
                colorText={theme.palette.text.white}
                colorTextHover={theme.palette.text.white}
                bgcolorHover={theme.palette.hover.mainGreen}
              />
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
