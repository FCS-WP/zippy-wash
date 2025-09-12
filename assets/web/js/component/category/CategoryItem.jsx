import React from "react";
import { Button } from "@mui/material";

export default function CategoryItem({ id, name, selectedCat, onSelect }) {
  const isSelected = selectedCat === id;
  const bg = isSelected ? "#F04150" : "transparent";
  const color = isSelected ? "#fff" : "inherit";
  const border = isSelected ? "#F04150" : "rgba(0, 0, 0, 0.23)";

  return (
    <Button
      variant="outlined"
      onClick={() => onSelect(id)}
      sx={{
        borderRadius: 2,
        textTransform: "none",
        bgcolor: bg,
        color: color,
        borderColor: border,
        ":hover, :focus": {
          bgcolor: bg,
          color: color,
          borderColor: border,
        },
      }}
    >
      {name}
    </Button>
  );
}
