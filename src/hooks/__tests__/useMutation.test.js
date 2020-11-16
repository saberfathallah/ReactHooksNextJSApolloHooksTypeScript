import { useMutation } from "../useMutation";

jest.mock("@apollo/react-hooks", () => ({
  useMutation() {
    return [{}, { data: undefined, loading: true, error: undefined }];
  },
}));

describe("useMutation", () => {
  it("use useMutation without options", () => {
    expect(useMutation({})).toEqual([
      {},
      { data: undefined, loading: true, error: undefined },
    ]);
  });
  it("use useMutation without optionCache", () => {
    expect(useMutation({}, { variable: false })).toEqual([
      {},
      { data: undefined, loading: true, error: undefined },
    ]);
  });

  it("use useMutation wit optionCache", () => {
    expect(
      useMutation(
        {},
        {
          variable: false,
          optionCache: { updateCacheFunction: () => {}, variable: false },
        }
      )
    ).toEqual([{}, { data: undefined, loading: true, error: undefined }]);
  });
});
