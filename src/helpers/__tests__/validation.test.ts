import validationForm from '../validation';

describe("validationForm", () => {
  it("should return error description", () => {
    const values = { description: "" };

    expect(validationForm(values)).toEqual({ description: "Required" });
  });
  it("should'tn return error description", () => {
    const values = { description: "description" };

    expect(validationForm(values)).toEqual({ });
  });
});


