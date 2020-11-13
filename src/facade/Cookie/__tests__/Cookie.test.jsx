import Cookie from "..";

describe("Cookie", () => {
  const cookies = new Cookie(true);
  const cookieName = "Test Cookie";
  it("should return the correct value", () => {
    cookies.set(cookieName, "my value");
    expect(cookies.get(cookieName)).toEqual("my value");
  });

  it("should return undefined because cookie not set", () => {
    cookies.remove(cookieName);
    expect(cookies.get(cookieName)).toBeUndefined();
  });
});
