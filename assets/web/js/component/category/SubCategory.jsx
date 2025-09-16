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
        bgcolor: isSelected
          ? theme.palette.primary.mainRed
          : theme.palette.primary.mainGreen,
        color: "#fff",
        border: isSelected
          ? `1px solid ${theme.palette.primary.mainRed}`
          : `1px solid ${theme.palette.primary.mainGreen}`,
        boxShadow: "0px 3px 8px rgba(0,0,0,0.25)",
        transition: "all 0.2s ease",
        ":hover": {
          bgcolor: "#006644",
          border: `1px solid ${theme.palette.primary.mainGreen}`,
        },
        ":focus": {
          bgcolor: theme.palette.primary.mainRed,
          border: `1px solid ${theme.palette.primary.mainRed}`,
        },
      }}
    >
      {name}
    </Button>
  );
}
