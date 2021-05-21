import React from "react";
import { Grid } from "@material-ui/core";
import { MMButton } from "./common/MMButton";
export const ETLStreamButtons = ({
  isStartLoading,
  isStopLoading,
  isClearLoading,
  handleOnStart,
  handleOnStop,
  handleClearTables,
}) => {
  return (
    <Grid container spacing={3} style={{ width: "20%", margin: "auto" }}>
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
