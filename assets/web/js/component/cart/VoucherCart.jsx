import React from "react";
import { Box, Divider, Typography } from "@mui/material";

export default function VoucherCart({ cartAppliedCoupon }) {
  return (
    <>
      {(cartAppliedCoupon?.cart_info?.discount_total > 0 ||
        cartAppliedCoupon?.cart_info?.fee_total > 0) && (
        <>
          <Divider />
          <Box sx={{ py: 1 }}>
            {cartAppliedCoupon?.cart_info?.discount_total > 0 && (
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                Discount:{" "}
                <span style={{ color: "#F04150", fontWeight: "bold" }}>
                  - ${cartAppliedCoupon?.cart_info?.discount_total.toFixed(2)}
                </span>
              </Typography>
            )}

            {cartAppliedCoupon?.cart_info?.fee_total > 0 && (
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                Fee:{" "}
                <span style={{ color: "#F04150", fontWeight: "bold" }}>
                  ${cartAppliedCoupon?.cart_info?.fee_total.toFixed(2)}
                </span>
              </Typography>
            )}
          </Box>
        </>
      )}
    </>
  );
}
