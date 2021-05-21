import React from "react";
import "./App.css";
import ETLDashboard from "./components/ETLDashboard";
import ETLHead from "./components/HeaderArea/ETLHead";
import { ETLTable } from "./components/Table/ETLTable";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
const theme = createMuiTheme({
  overrides: {
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
      <ETLHead />
      <ETLDashboard />
      <ETLTable />
    </ThemeProvider>
  );
}

export default App;
