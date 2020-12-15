import React, { createContext, useContext } from "react";
import { ContextDevTool } from "react-context-devtool";
import { ESKTOP_BREAKPOINT } from "@constants/dimensions";
import useScreen from "../hooks/useScreen";

type deviceType = {
  isMobileSize?: boolean;
  screenWidth: number | null | undefined;
};

type propsTypes = {
  isClient?: boolean;
  children: React.ReactNode;
};

const defaultDeviceValues: deviceType = {
  isMobileSize: false,
  screenWidth: ESKTOP_BREAKPOINT,
};

export const ScreenContext = createContext<deviceType>(defaultDeviceValues);

export const ScreenProvider = ({ isClient, children }: propsTypes) => {
  const width = isClient && window.innerWidth;
  const screen = useScreen(isClient, width);

  return (
    <ScreenContext.Provider value={{ ...defaultDeviceValues, ...screen }}>
      <ContextDevTool
        context={ScreenContext}
        id="ScreenContextId"
        displayName="ScreenContext"
      />
      {children}
    </ScreenContext.Provider>
  );
};

const withScreenDimension = (Component) => (props) => {
  const { screenWidth, isMobileSize } = useContext(ScreenContext);
  return (
    <Component
      {...props}
      isMobileSize={isMobileSize}
      screenWidth={screenWidth}
    />
  );
};

export default withScreenDimension;
