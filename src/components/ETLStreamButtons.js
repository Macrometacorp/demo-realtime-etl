import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { MMButton } from "./common/MMButton";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "20%",
    margin: "auto",

    [theme.breakpoints.up("lg")]: {
      flexWrap: "nowrap",
      width: "25%",
      margin: "auto",
    },
    // [theme.breakpoints.down("xl")]: { flexWrap: "nowrap" },
    // [theme.breakpoints.down("xl")]: { width: "40%" },
    // // [theme.breakpoints.down("xl")]: { width: "30%" },
    // [theme.breakpoints.down("md")]: {},
    // [theme.breakpoints.down("sm")]: {},
    // [theme.breakpoints.down("xs")]: {},
  },
}));

export const ETLStreamButtons = ({
  isStartLoading,
  isStopLoading,
  isClearLoading,
  handleOnStart,
  handleOnStop,
  handleClearTables,
}) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.gridContainer}>
      <Grid item xs>
        <MMButton
          buttonText="Start"
          buttonType="primary"
          smValue={12}
          id={"start"}
          disableButton={isStartLoading || isStopLoading || isClearLoading}
          loading={isStartLoading}
          onClickCb={handleOnStart}
          buttonStyle={{ marginRight: "20px" }}
        />
      </Grid>
      <Grid item xs>
        <MMButton
          buttonText="Stop"
          buttonType="primary"
          id={"stop"}
          smValue={12}
          disableButton={isStartLoading || isStopLoading || isClearLoading}
          loading={isStopLoading}
          onClickCb={handleOnStop}
          buttonStyle={{ marginRight: "20px" }}
        />
      </Grid>
      <Grid item xs>
        <MMButton
          buttonText="Clear"
          buttonType="primary"
          smValue={12}
          id={"clear-tables"}
          disableButton={isStartLoading || isStopLoading || isClearLoading}
          loading={isClearLoading}
          onClickCb={handleClearTables}
          buttonStyle={{ marginRight: "20px" }}
        />
      </Grid>
    </Grid>
  );
};
