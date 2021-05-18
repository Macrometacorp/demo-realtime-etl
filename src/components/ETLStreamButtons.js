import React from "react";
import { Grid } from "@material-ui/core";
import { MMButton } from "./common/MMButton";
export const ETLStreamButtons = ({
  handleOnStart,
  handleOnStop,
  isStartLoading,
  isStopLoading,
}) => {
  return (
    <Grid container spacing={5} style={{ width: "30%", margin: "auto" }}>
      <Grid item xs>
        <MMButton
          buttonText="Start"
          buttonType="primary"
          smValue={12}
          disableButton={isStartLoading || isStopLoading}
          loading={isStartLoading}
          onClickCb={handleOnStart}
          buttonStyle={{ marginRight: "20px" }}
        />
      </Grid>
      <Grid item xs>
        <MMButton
          buttonText="Stop"
          buttonType="primary"
          smValue={12}
          disableButton={isStartLoading || isStopLoading}
          loading={isStartLoading}
          onClickCb={handleOnStart}
          buttonStyle={{ marginRight: "20px" }}
        />
      </Grid>
      <Grid item xs>
        <MMButton
          buttonText="Clear Tables"
          buttonType="primary"
          smValue={12}
          disableButton={isStartLoading || isStopLoading}
          loading={isStartLoading}
          onClickCb={handleOnStart}
          buttonStyle={{ marginRight: "20px" }}
        />
      </Grid>
    </Grid>
  );
};
