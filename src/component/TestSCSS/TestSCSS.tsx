import React, { useState } from "react";
import "./testSCSS.scss";
import withScreenDimension from "@context/screenContext";

const TestSCSS = (props) => {
  console.log("props", props);
  const [disable, setDisable] = useState(false);
  return (
    <div>
      <button
        onClick={() => setDisable(true)}
        disabled={disable}
        className="button"
      >
        button
      </button>
      <button className="mixin-button">mixin-button</button>
      <p className="text">test scss</p>
    </div>
  );
};

export default withScreenDimension(TestSCSS);
