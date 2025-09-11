import React from "react";
import ReactDOM from "react-dom/client";import "./calendar/old_calendar";
import theme from "../theme/customTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import OrderForm from "./components/zippy-forms/OrderForm";

document.addEventListener("DOMContentLoaded", function () {
  const zippyMain = document.getElementById("zippy-form");

  if (typeof zippyMain != "undefined" && zippyMain != null) {
    const root = ReactDOM.createRoot(zippyMain);
    root.render(      
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <>Shin</>
      <ToastContainer />
    </ThemeProvider>);
  }
});
