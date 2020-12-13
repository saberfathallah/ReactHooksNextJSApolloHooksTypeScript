import React, { createContext, useEffect, useState, useContext } from "react";
import { ContextDevTool } from "react-context-devtool";
import { isMobile, isMobileWidth } from "@utils/isBrowser";
import { ESKTOP_BREAKPOINT } from "@constants/dimensions";

type deviceType = {
  isMobileSize?: boolean;
  screenWidth: number | null | undefined;
};

type propsTypes = {
  isClient?: boolean;
  children: React.ReactNode;
};

const defaultDeviceValues: deviceType = {
  isMobileSize: isMobile,
  screenWidth: ESKTOP_BREAKPOINT,
};

export const DeviceContext = createContext<deviceType>(defaultDeviceValues);

export const DeviceProvider = ({ isClient, children }: propsTypes) => {
  const [currentScreen, setCurrentScreen] = useState({
    screenWidth: ESKTOP_BREAKPOINT,
    isMobileSize: isMobile,
  });

  useEffect(() => {
    if (!isClient) {
      return;
    }

    // first load
    setCurrentScreen({
      screenWidth: window.innerWidth,
      isMobileSize: isMobileWidth(window.innerWidth),
    });

    const handleResize = () => {
      if (isClient) {
        setCurrentScreen({
          screenWidth: window.innerWidth,
          isMobileSize: isMobileWidth(window.innerWidth),
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return (
    <DeviceContext.Provider
      value={{ ...defaultDeviceValues, ...currentScreen }}
    >
      <ContextDevTool
        context={DeviceContext}
        id="DeviceContextId"
        displayName="DeviceContext"
      />
      {children}
    </DeviceContext.Provider>
  );
};

const withScreenDimension = (Component) => (props) => {
  const { screenWidth, isMobileSize } = useContext(DeviceContext);

  return (
    <Component
      {...props}
      isMobileSize={isMobileSize}
      screenWidth={screenWidth}
    />
  );
};

export default withScreenDimension;
