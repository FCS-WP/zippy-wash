import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import theme from "../../../theme/customTheme";

export default function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <Stack
      key={item.id}
      direction="row"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      {/* Tên sản phẩm */}
      <Box
        sx={{
          width: { xs: "100px", sm: "100px", md: "140px", lg: "200px" },
          flexShrink: 0,
        }}
      >
        <Typography
          noWrap
          sx={{
            fontSize: { xs: "0.7rem", sm: "1rem", md: "1.1rem" },
          }}
        >
          {item.name}
        </Typography>
      </Box>

      {/* Nút +/- số lượng */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ flex: 1, justifyContent: "center" }}
      >
        <IconButton
          size="small"
          onClick={() => onUpdateQty(item, item.quantity - 1)}
          sx={{
            "&:focus": { backgroundColor: theme.palette.primary.mainRed },
            "&:hover": { backgroundColor: theme.palette.primary.mainRed },
          }}
        >
          <Remove fontSize="small" />
        </IconButton>

        <Typography>{item.quantity}</Typography>

        <IconButton
          size="small"
          onClick={() => onUpdateQty(item, item.quantity + 1)}
          sx={{
            "&:focus": { backgroundColor: theme.palette.primary.mainRed },
            "&:hover": { backgroundColor: theme.palette.primary.mainRed },
          }}
        >
          <Add fontSize="small" />
        </IconButton>
      </Stack>

      {/* Giá + nút xóa */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ width: 120, justifyContent: "flex-end" }}
      >
        <Typography
          sx={{ textAlign: "right", minWidth: 50 }}
          dangerouslySetInnerHTML={{ __html: item.formatted_price }}
        />
        <IconButton
          size="small"
          onClick={() => onRemove(item.cart_item_key)}
          sx={{ color: theme.palette.primary.mainRed }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
