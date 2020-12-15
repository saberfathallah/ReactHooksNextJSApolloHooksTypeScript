import React from "react";
import "./testSCSS.scss";
import withScreenDimension from "@context/screenContext";

const Test = (props) => {
  console.log("propshhhh", props);
  return (
    <div>
      <p className="text">Test Component</p>
    </div>
  );
};

export default withScreenDimension(Test);
