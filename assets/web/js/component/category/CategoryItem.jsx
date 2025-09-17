import React from "react";
import { Box, Button } from "@mui/material";
import theme from "../../../theme/customTheme";

export default function CategoryItem(props) {
  const { id, name, img, selectedCat, onSelect } = props;
  const isSelected = selectedCat === id;

  return (
    <Button
      className="cat-btn"
      variant="outlined"
      onClick={() => onSelect(id)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        textAlign: "center",
        borderRadius: "5px",
        minWidth: "auto",
        textTransform: "none",
        bgcolor: isSelected ? theme.palette.primary.mainRed : "#fff",
        color: isSelected ? "#fff" : theme.palette.text.primary,
        border: isSelected
          ? `1px solid ${theme.palette.primary.mainRed}`
          : "1px solid #ebe8e8ff",
        transition: "all 0.2s ease",
        ":hover": {
          bgcolor: "#ede9e9ff",
          color: theme.palette.text.primary,
          border: `1px solid #ede9e9ff`,
        },
        ":focus": {
          bgcolor: isSelected ? theme.palette.primary.mainRed : "#d3d3d3ff",
          color: isSelected ? "#fff" : theme.palette.text.primary,
          border: `1px solid ${theme.palette.primary.mainRed}`,
        },
      }}
    >
      {img && (
        <Box
          component="img"
          src={img}
          alt={name}
          sx={{
            width: 35,
            height: 23,
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
      )}
      {name}
    </Button>
  );
}
