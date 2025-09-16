import React from "react";
import { Button } from "@mui/material";
import theme from "../../../theme/customTheme";

export default function CategoryItem({
  id,
  name,
  selectedCat,
  onSelect,
  bgcolor = theme.palette.primary.main,
  colorText = theme.palette.text.primary,
  colorTextHover = theme.palette.text.primary,
  bgcolorHover = theme.palette.hover.main,
}) {
  const isSelected = selectedCat === id;
  const bg = isSelected ? theme.palette.primary.mainRed : bgcolor;
  const colorTextActive = "#ffffff";

  return (
    <Button
      variant="outlined"
      onClick={() => onSelect(id)}
      sx={{
        borderRadius: "30px",
        minWidth: "auto",
        px: 2,
        bgcolor: bg,
        color: colorText,
        ":focus": {
          bgcolor: bg,
          color: colorTextActive,
        },
        ":hover": {
          bgcolor: bgcolorHover,
          color: colorTextHover,
        },
      }}
    >
      {name}
    </Button>
  );
}
