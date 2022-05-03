import React from "react";
import {
  AppBar, 
  Button, 
  makeStyles
} from "@material-ui/core";

import Macrometa from "../../images/macrometa.png";

const useStyles = makeStyles({
  root: {
    top: "auto !important",
    backgroundColor: "white",
    bottom: 0,
    alignItems: "end",
  },
  poweredByBtn: {
    color: "rgba(33, 33, 33, 0.6) !important",
    marginRight: "8px",
  },
  logo: {
    paddingRight: "4px",
    height: "30px",
    width: "30px",
  },
});

const Footer = () => {
  const classes = useStyles()

  return (
    <AppBar position="fixed" color="transparent" className={classes.root}>
      <Button variant="text" className={classes.poweredByBtn}>
        <img src={Macrometa} className={classes.logo} alt="Macrometa Inc." />
        Powered By Macrometa
      </Button>
    </AppBar>
  );
};

export default Footer;
