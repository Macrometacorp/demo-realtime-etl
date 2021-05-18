import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { MMHeading } from "./common/MMHeading";
import { MMButton } from "./common/MMButton";

const useStyles = makeStyles(() => ({
  titleStyle: {
    fontWeight: "700",
    wordSpacing: "0.5",
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

export const ETLHeaderArea = ({ handleClearAllTables, isClearLoading }) => {
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
    // <Grid container direction="row" justify="center">
    //   <Grid
    //     item
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       paddingTop: "10px",
    //     }}
    //   >
    //     <MMHeading
    //       title="Macrometa Streaming ETL"
    //       justifyValue="center"
    //       typographyVariant="h4"
    //     />
    //   </Grid>
    //   <Grid
    //     item
    //     // xs={8}
    //     style={{
    //       position: "absolute",
    //       right: "10px",
    //       top: "10px",
    //     }}
    //   >
    //     <MMButton
    //       buttonText="Clear Tables "
    //       buttonType="primary"
    //       smValue={12}
    //       onClickCb={handleClearAllTables}
    //       loading={isClearLoading}
    //       buttonStyle={{ justifyContent: "flex-end" }}
    //     />
    //   </Grid>
    //   <MMHeading
    //     title="Real time ETL with Stream Workers & Query Workers for synthetic bank data"
    //     justifyValue="center"
    //     typographyVariant="h6"
    //   />
    // </Grid>
  );
};
