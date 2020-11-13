import isBrowser from "../isBrowser";

describe("isBrowser", () => {
  it("should return true", () => {
    expect(isBrowser()).toBe(true);
  });

  it("should return false", () => {
    const isBrowserMock = jest.fn(() => isBrowser()).mockReturnValue(false);

     expect(isBrowserMock()).toBe(false);
   });
});
