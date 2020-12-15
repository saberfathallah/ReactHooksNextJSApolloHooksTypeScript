import React, { useState } from "react";
import "./testSCSS.scss";
import Test from "./TestComponent";

import withScreenDimension from "@context/screenContext";

const TestSCSS = (props) => {
  console.log("props", props);
  const [disable, setDisable] = useState(false);
  return (
    <div>
      <p className="text">saber</p>
      <button
        onClick={() => setDisable(true)}
        disabled={disable}
        className="button"
      >
        button
      </button>
      <button className="mixin-button">mixin-button</button>
      <p className="text">test scss</p>
      <Test />
    </div>
  );
};

export default withScreenDimension(TestSCSS);
