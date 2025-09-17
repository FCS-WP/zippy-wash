import React from "react";
import { Stack, Pagination } from "@mui/material";
import theme from "../../../theme/customTheme.js";

export default function CustomPagination({ page, totalPages, onChange }) {
  return (
    <Stack id="pagination" direction="row" justifyContent="center" mt={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={onChange}
        size="medium"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#000",
          },
          "& .Mui-selected": {
            backgroundColor: `${theme.palette.primary.mainRed} !important`,
            color: "#fff !important",
            "&:hover": {
              backgroundColor: `${theme.palette.primary.mainRed} !important`,
            },
          },
        }}
      />
    </Stack>
  );
}
