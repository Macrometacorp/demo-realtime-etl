import React from "react";
import { Grid, Toolbar, makeStyles, lighten } from "@material-ui/core";
import clsx from "clsx";
import Select from "react-select";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    maxHeight: "80px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

export const EnhancedTableToolbar = ({
  bankClientNames,
  isLoading,
  selectedClient,
  handleSelectClient,
}) => {
  const classes = useToolbarStyles();
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        // backgroundColor:"white",
        color: "rgba(105,105,105,0.8)",
        fontFamily: "Lato",
        fontWeight: "700",
        // cursor: isDisabled ? "not-allowed" : "default",
      };
    },
    placeholder: (defaultStyles) => {
      const color = "rgba(105,105,105,0.8)";
      const fontFamily = "Lato";
      const fontWeight = "700";

      return { ...defaultStyles, color, fontFamily, fontWeight };
    },
  };

  return (
    <Toolbar
      className={clsx(classes.root)}
      style={{
        backgroundColor: "rgba(51,138,208,0.6)",
      }}
    >
      <Grid container>
        <Grid item xs>
          <Select
            options={bankClientNames}
            styles={colourStyles}
            value={selectedClient}
            onChange={handleSelectClient}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.id}
            placeholder={selectedClient ? selectedClient : "Client Name"}
          />
        </Grid>
        <Grid
          item
          xs={10}
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontWeight: "500",
              fontSize: "24px",
              fontFamily: "Lato",
              color: "rgba(0,0,0,0.8)",
              marginTop: "24px",
              marginLeft: "-180px",
            }}
          >
            Client Data
          </span>
        </Grid>
      </Grid>
    </Toolbar>
  );
};
