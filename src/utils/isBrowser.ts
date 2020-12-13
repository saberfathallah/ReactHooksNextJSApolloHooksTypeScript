import { IS_MOBILE_DIMENSION } from "@constants/dimensions";

const isBrowser = (): boolean => typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const userAgent = isBrowser()
  ? window.navigator.userAgent || window.navigator.vendor
  : "";

export const isMobile = /Mobi/.test(userAgent);

export const isMobileWidth= (width: number): boolean => width < IS_MOBILE_DIMENSION ;

export default isBrowser;
