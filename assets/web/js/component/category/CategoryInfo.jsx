import React, { useEffect, useState } from "react";
import { Stack, Typography, Paper, Avatar, Box } from "@mui/material";

export default function CategoryInfo(props) {
  const { categories, selectedCat } = props;

  if (!categories || categories.length === 0 || !selectedCat) {
    return null;
  }

  const category = categories.find((cat) => cat.id === selectedCat);

  if (!category) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        my: 2,
        bgcolor: "#fbdfdfff",
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
    </Paper>
  );
}
