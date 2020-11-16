import { useQuery } from "../useQuery";

jest.mock("@apollo/react-hooks", () => ({
  useQuery() {
    return {
      data: undefined,
      loading: true,
    };
  },
}));
const useQueryApollo = jest.spyOn(require("@apollo/react-hooks"), "useQuery");

describe("useQuery", () => {
  it("should laoding true data undefined", () => {
    expect(useQuery({})).toEqual({ data: undefined, loading: true });
  });

  it("should laoding false data defined", () => {
    useQueryApollo.mockImplementation(() => ({
      data: { user: {} },
      loading: false,
    }));

    expect(useQuery({})).toEqual({ data: { user: {} }, loading: false });
  });
});
