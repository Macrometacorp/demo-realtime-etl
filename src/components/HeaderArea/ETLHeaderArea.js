import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { MMHeading } from "../common/MMHeading";
import { MMButton } from "../common/MMButton";

const useStyles = makeStyles(() => ({
  titleStyle: {
    fontWeight: "700",
    wordSpacing: "0.5",
    color: "black",
  },
  content: {
    textAlign: "center",
    padding: "20px",
  },
  subtitle: {
    // maxWeight: "30%",
    width: "30%",
    margin: "auto",
    lineHeight: "1.2",
  },
}));

export const ETLHeaderArea = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.content}>
      <Typography variant="h4" className={classes.titleStyle}>
        Macrometa Streaming ETL
      </Typography>
      <Typography variant="h6" className={classes.subtitle}>
        Real time ETL with Stream Workers & Query Workers for synthetic bank
        data
      </Typography>
    </Grid>
  );
};
