import React from "react";
import ReactDOM from "react-dom/client";
import theme from "../theme/customTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Shop from "./pages/shop.jsx";

document.addEventListener("DOMContentLoaded", function () {
  const zippyMain = document.getElementById("zippy-form");

  if (typeof zippyMain != "undefined" && zippyMain != null) {
    const root = ReactDOM.createRoot(zippyMain);
    root.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <>Shin</>
        <ToastContainer />
      </ThemeProvider>
    );
  }

  const shopPage = document.getElementById("shop_page");
  if (typeof shopPage != "undefined" && shopPage != null) {
    const root = ReactDOM.createRoot(shopPage);
    root.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Shop />
        <ToastContainer />
      </ThemeProvider>
    );
  }
});
