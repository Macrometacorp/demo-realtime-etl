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
              fontWeight: "700",
              fontSize: "30px",
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
