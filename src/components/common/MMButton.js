import React from "react";
import { Grid, Button, makeStyles, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  submitButton: {
    // radius:"50%",
    // backgroundColor: "#338ad0",
    // color: "#ffffff",
    // borderRadius: "7%",
    textTransform: "capitalize",
    // border: "1px solid #0000006b",
    backgroundColor: "rgba(211,225,240,1)",

    marginRight: "20px",
    width: "100%",
    // padding: "10px 0px",
    fontFamily: "Lato",
    fontWeight: "900",
    color: "rgba(0,0,0,1)",
    fontSize: "16px",

    // // "&:hover": {
    // //   backgroundColor: "#1971b3",
    // //   "&:disabled": {
    // //     backgroundColor: "#85c1f5",
    // //     boxShadow: "none",
    // //     color: "#def0ff",
    // //   },
    // },
    // "&:disabled": {
    //   backgroundColor: "#85c1f5",
    //   boxShadow: "none",
    //   color: "#def0ff",
    // },
  },
}));

export const MMButton = ({
  directionValue = "row",
  gridStyle,
  justifyValue = "center",
  alignItemsValue = "center",
  buttonVariant = "contained",
  buttonType = "submit",
  onClickCb,
  disableButton,
  buttonText,
  loading,
  smValue = 6,
  buttonStyle = {},
  id,
}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* <Grid
        container
        item
        style={gridStyle}
        justify={justifyValue}
        alignItems={alignItemsValue}
        sm={smValue}
      > */}
      <Button
        id={id}
        variant={buttonVariant}
        type={buttonType}
        fullWidth
        onClick={onClickCb}
        className={classes.submitButton}
        color="default"
        disabled={disableButton}
        style={buttonStyle}
      >
        {loading ? <CircularProgress size={30} /> : buttonText}
      </Button>
      {/* </Grid> */}
    </React.Fragment>
  );
};
