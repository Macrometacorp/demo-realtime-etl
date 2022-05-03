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
        backgroundColor: "#E1E1FA",
        boxShadow: "none",
        color: "#4D4DAD",
        "&:hover, &:focus, &:active": {
          backgroundColor: "#C2C2F5",
          boxShadow: "0 2px 5px rgba(133, 133, 235, .35)",
          color: "#343473",
        },
        "&:disabled": {
          backgroundColor: "#E2E4E8",
          color: "#535968",
        },
      },
      containedPrimary: {
        backgroundColor: "#6767E6",
        color: "#FFF",
        "&:hover, &:focus, &:active": {
          backgroundColor: "#4D4DAD",
          color: "#FFF",
        },
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
