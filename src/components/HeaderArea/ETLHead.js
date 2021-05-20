import React from "react";
import { MMButton } from "../common/MMButton";
import { ETLHeaderArea } from "./ETLHeaderArea";

const ETLHead = () => {
  return (
    <React.Fragment>
      <div style={{ position: "absolute", right: "10px", top: "10px" }}>
        <MMButton
          buttonText="About"
          id={"about"}
          onClickCb={() => {
            window.open(
              "https://github.com/Macrometacorp/demo-realtime-etl/blob/main/README.md",
              "_blank"
            );
          }}
        />
      </div>
      <ETLHeaderArea />
    </React.Fragment>
  );
};

export default ETLHead;
