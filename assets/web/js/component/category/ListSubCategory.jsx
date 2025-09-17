import React from "react";
import { Button, Stack, Box } from "@mui/material";
import theme from "../../../theme/customTheme";
import SubCategory from "./SubCategory.jsx";

export default function ListSubCategory({
  category,
  selectedSubCategory,
  setSelectedSubCategory,
}) {
  return (
    <>
      {category && category.children && category.children.length > 0 && (
        <Stack
          id="category-info"
          direction="row"
          spacing={1}
          sx={{
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
              <SubCategory
                id={child.id}
                name={child.name}
                selectedCat={selectedSubCategory}
                onSelect={setSelectedSubCategory}
                bgcolor={theme.palette.primary.mainGreen}
                colorText={theme.palette.text.white}
                colorTextHover={theme.palette.text.white}
                bgcolorHover={theme.palette.hover.mainGreen}
              />
            </Box>
          ))}
        </Stack>
      )}
    </>
  );
}
