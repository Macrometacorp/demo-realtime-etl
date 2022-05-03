import React from "react";
import "./App.css";
import ETLDashboard from "./components/ETLDashboard";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { ETLTable } from "./components/Table/ETLTable";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: "none",
        "&:hover, &:focus, &:active": {
          boxShadow: "0 2px 5px rgba(133, 133, 235, .35)",
        },
      },
      containedPrimary: {
        backgroundColor: "#002F87",
        color: "#FFF",
        "&:hover, &:focus, &:active": {
          backgroundColor: "#029AE0",
          color: "#FFF",
        },
      },
      label: {
        fontWeight: "700",
      },
    },
    MuiFormControl: {
      root: {
        height: "56px",
      },
    },
    MuiInputBase: {
      root: {
        height: "30px",
        width: "60px",
      },
    },
    typography: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
    MuiTypography: {
      h6: {
        fontSize: "16px",
      },
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ETLDashboard />
      <ETLTable />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
