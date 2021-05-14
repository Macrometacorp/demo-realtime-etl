import React from "react";
import { Grid } from "@material-ui/core";
import { MMHeading } from "./common/MMHeading";
import { MMButton } from "./common/MMButton";
export const ETLHeaderArea = ({ handleClearAllTables, isClearLoading }) => {
  return (
    <Grid container direction="row" justify="center">
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "10px",
        }}
      >
        <MMHeading
          title="Macrometa Streaming ETL"
          justifyValue="center"
          typographyVariant="h4"
        />
      </Grid>
      <Grid
        item
        direction="row"
        alignItems="flex-end"
        justify="flex-end"
        // xs={8}
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
        }}
      >
        <MMButton
          buttonText="Clear Tables "
          buttonType="primary"
          smValue={12}
          onClickCb={handleClearAllTables}
          loading={isClearLoading}
          buttonStyle={{ justifyContent: "flex-end" }}
        />
      </Grid>
      <MMHeading
        title="Real time ETL with Stream Workers & Query Workers for synthetic bank data"
        justifyValue="center"
        typographyVariant="h6"
      />
    </Grid>
  );
};
