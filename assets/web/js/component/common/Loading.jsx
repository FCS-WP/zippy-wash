import React from "react";
import { Box } from "@mui/material";
import theme from "../../../theme/customTheme";

export default function Loading({
  size = 40,
  color = theme.palette.primary.main,
  fullHeight = false,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          border: `${size / 8}px solid #f3f3f3`,
          borderTop: `${size / 8}px solid ${color}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      />
    </Box>
  );
}
