import React from "react";
import { Button } from "@mui/material";
import theme from "../../../theme/customTheme";

export default function CategoryItem(props) {
  const { id, name, selectedCat, onSelect } = props;
  const isSelected = selectedCat === id;

  return (
    <Button
      className="cat-btn"
      variant="outlined"
      onClick={() => onSelect(id)}
      sx={{
        textAlign: "center",
        borderRadius: "30px",
        minWidth: "auto",
        px: 2,
        textTransform: "none",
        bgcolor: isSelected ? theme.palette.primary.mainRed : "#d3d3d3ff",
        color: isSelected ? "#fff" : theme.palette.text.primary,
        border: isSelected
          ? `1px solid ${theme.palette.primary.mainRed}`
          : "1px solid transparent",
        boxShadow: isSelected
          ? "0px 4px 12px rgba(0,0,0,0.3)"
          : "0px 2px 5px rgba(0,0,0,0.15)",
        transition: "all 0.2s ease",
        ":hover": {
          bgcolor: "#bebbbbff",
          color: theme.palette.text.primary,
          border: `1px solid #bebbbbff`,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
        },
        ":focus": {
          bgcolor: isSelected ? theme.palette.primary.mainRed : "#d3d3d3ff",
          color: isSelected ? "fff" : theme.palette.text.primary,
          border: `1px solid ${theme.palette.primary.mainRed}`,
        },
      }}
    >
      {name}
    </Button>
  );
}
