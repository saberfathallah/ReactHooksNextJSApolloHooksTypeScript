/* eslint-disable no-undef */

const isBrowser = (): boolean => typeof window !== 'undefined' && typeof window.document !== 'undefined';

export default isBrowser;
