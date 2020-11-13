import Cookie from "@facade/Cookie";
import * as isBrowser from "@utils/isBrowser";

import buildCookies from "..";
import { TOKEN_COOKIE, USER_NAME } from "@constants/cookies";

jest.mock("@facade/Cookie");

describe("Cookies Services", () => {
  it("mock set cookie", async () => {
    const setCookieMock = jest.fn();
    Cookie.prototype.get = jest.fn().mockReturnValue(false);
    Cookie.prototype.set = setCookieMock;
    // @ts-ignore
    isBrowser.isBrowser = jest.fn().mockReturnValue(false);
    buildCookies().set(TOKEN_COOKIE, { token: "token" }, { path: "/" });

    expect(setCookieMock).toHaveBeenCalledWith(
      TOKEN_COOKIE,
      {
        token: "token",
      },
      { path: "/" }
    );
  });

  it("mock set cookie server side", async () => {
    const setCookieMock = jest.fn();
    Cookie.prototype.get = jest.fn().mockReturnValue(false);
    Cookie.prototype.set = setCookieMock;
    // @ts-ignore
    isBrowser.isBrowser = jest.fn().mockReturnValue(true);
    const ctx = {
      headers: { cookie: { token: "token "}}
    }
    buildCookies(ctx).set(TOKEN_COOKIE, { token: "token" }, { path: "/" });

    expect(setCookieMock).toHaveBeenCalledWith(
      TOKEN_COOKIE,
      {
        token: "token",
      },
      { path: "/" }
    );
  });

  // it("should return WOMEN", async () => {
  //   Cookie.prototype.get = jest.fn().mockReturnValue("");
  //   const cookie = getUniverse();
  //   expect(cookie).toEqual(WOMEN);
  // });

  // it("should return universe cookie", async () => {
  //   Cookie.prototype.get = jest.fn().mockReturnValue({ universe: "MEN" });
  //   const cookie = getUniverse();
  //   expect(cookie).toEqual("MEN");
  // });
});
