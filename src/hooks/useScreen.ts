import { useEffect, useState } from "react";
import { isMobileWidth } from "@utils/isBrowser";
import { ESKTOP_BREAKPOINT } from "@constants/dimensions";

const useScreen = (isClient: boolean, width: number) => {
  const [screen, setScreen] = useState({
    screenWidth: width || ESKTOP_BREAKPOINT,
    isMobileSize: width ? isMobileWidth(width) : false,
  });

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => {
      if (isClient) {
        setScreen({
          screenWidth: window.innerWidth,
          isMobileSize: isMobileWidth(window.innerWidth),
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isClient, setScreen]);

  return screen;
};

export default useScreen;
