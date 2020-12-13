import { useEffect, useState } from "react";
import { isMobile, isMobileWidth } from "@utils/isBrowser";
import { ESKTOP_BREAKPOINT } from "@constants/dimensions";

const useScreen = (isClient) => {
  const [screen, setScreen] = useState({
    screenWidth: ESKTOP_BREAKPOINT,
    isMobileSize: isMobile,
  });

  useEffect(() => {
    if (!isClient) {
      return;
    }

    // first load
    setScreen({
      screenWidth: window.innerWidth,
      isMobileSize: isMobileWidth(window.innerWidth),
    });

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
  }, [isClient]);

  return screen;
};

export default useScreen;
