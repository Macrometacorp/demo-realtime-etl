import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  header: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  logo: {
    height: "28px",
    padding: "1rem 0 2.5rem",
    width: "auto",
  },
}));

export const MMHeading = ({
  title,
  justifyValue = "center",
  typographyVariant = "h3",
  gridDirectionValue = "row",
  component = "h1",
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction={gridDirectionValue}
      justify={justifyValue}
      alignItems={"flex-start"}
    >
      <Typography variant={typographyVariant} component={component}>
        {title}
      </Typography>
    </Grid>
  );
};
