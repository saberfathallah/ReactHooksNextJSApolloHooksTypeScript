import React, { useState } from "react";
import "./testSCSS.scss";

const TestSCSS = () => {
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

export default TestSCSS;
