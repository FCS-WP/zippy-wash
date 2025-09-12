import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Loading({ size = 40, fullHeight = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        ...(fullHeight && { minHeight: "200px" }),
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
