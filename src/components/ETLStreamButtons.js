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
    <Grid
      container
      direction="row"
      justify="center"
      style={{ paddingTop: "30px" }}
    >
      <Grid item>
        <MMButton
          buttonText="START"
          buttonType="primary"
          smValue={12}
          disableButton={isStartLoading || isStopLoading}
          loading={isStartLoading}
          onClickCb={handleOnStart}
          buttonStyle={{ marginRight: "20px" }}
        />
      </Grid>
      <Grid item>
        <MMButton
          buttonText="STOP"
          buttonType="primary"
          disableButton={isStartLoading || isStopLoading}
          loading={isStopLoading}
          onClickCb={handleOnStop}
          smValue={12}
        />
      </Grid>
    </Grid>
  );
};
