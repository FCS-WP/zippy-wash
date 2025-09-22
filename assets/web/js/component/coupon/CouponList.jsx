import React, { useEffect, useState, useMemo } from "react";
import { Paper, Typography, Stack, IconButton, Box } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { webApi } from "../../api";
import theme from "../../../theme/customTheme";
import { toast } from "react-toastify";

export default function CouponList({
  cartAppliedCoupon,
  setCartAppliedCoupon,
  coupons,
}) {


  const removeCoupon = async (id) => {
    try {
      const { data: res } = await webApi.removeCoupon({ id });
      if (res.status === "success") {
        setCartAppliedCoupon(res.data);
        toast.info("Removed coupon!");
        return true;
      } else {
        toast.error(res.message || "Failed to remove coupon!");
        return false;
      }
    } catch (error) {
      toast.error("Failed to remove coupon!");
      return false;
    }
  };

  const addCoupon = async (id) => {
    try {
      const { data: res } = await webApi.applyCouponToCart({ id });
      if (res.status === "success") {
        setCartAppliedCoupon(res.data);
        toast.success("Applied coupon successfully!");
        return true;
      } else {
        toast.error(res.message || "Failed to apply coupon!");
        return false;
      }
    } catch (error) {
      toast.error("Failed to apply coupon!");
      return false;
    }
  };

  const handleCoupon = async (id) => {
    const appliedCoupons = cartAppliedCoupon?.applied_coupons || [];
    const currentApplied = appliedCoupons[0];

    if (currentApplied) {
      if (Number(currentApplied.id) === Number(id)) {
        await removeCoupon(id);
      } else {
        const removed = await removeCoupon(Number(currentApplied.id));
        if (removed) {
          await addCoupon(id);
        }
      }
    } else {
      await addCoupon(id);
    }
  };

  const appliedIds = useMemo(() => {
    const arr = cartAppliedCoupon?.applied_coupons || [];
    return new Set(arr.map((c) => Number(c.id)));
  }, [cartAppliedCoupon]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: 2,
        bgcolor: "#fff",
        py: 2,
        overflowX: "auto",
        "&::-webkit-scrollbar": { height: 6 },
        "&::-webkit-scrollbar-thumb": { background: "#ccc", borderRadius: 3 },
      }}
    >
      {coupons.map((coupon) => {
        const applied = appliedIds.has(Number(coupon.id));

        return (
          <Paper
            elevation={0}
            key={coupon.id}
            sx={{
              p: 1,
              bgcolor: "#fff",
              cursor: "pointer",
              ":hover": { bgcolor: applied ? "#fff" : "#f0f0f0" },
              border: applied
                ? `2px solid ${theme.palette.primary.mainGreen}`
                : "1px solid #cfcfcfff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => handleCoupon(coupon.id)}
          >
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ fontSize: "0.8rem", textAlign: "center" }}
            >
              {coupon.post_excerpt}
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
}
