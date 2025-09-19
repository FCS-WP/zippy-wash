import React from "react";
import { Button } from "@mui/material";
import theme from "../../../theme/customTheme";

export default function SubCategory({ id, name, selectedCat, onSelect }) {
  const isSelected = selectedCat === id;
  return (
    <Button
      className="subcat-btn"
      variant="outlined"
      onClick={() => onSelect(id)}
      sx={{
        textAlign: "center",
        borderRadius: "20px",
        minWidth: "auto",
        px: 1.5,
        py: 0.5,
        fontSize: "12px",
        textTransform: "none",
        bgcolor: "#fff",
        color: theme.palette.text.primary,
        border: isSelected
          ? `2px solid ${theme.palette.primary.mainRed}`
          : "2px solid #e0e0e0ff",
        transition: "all 0.2s ease",
        ":hover": {
          bgcolor: "#fcf7f7ff",
          border: `2px solid ${theme.palette.primary.mainRed}`,
          color: theme.palette.text.primary,
        },
        ":focus": {
          bgcolor: "#fff",
          border: `2px solid ${theme.palette.primary.mainRed}`,
          color: theme.palette.text.primary,
        },
      }}
    >
      {name}
    </Button>
  );
}
