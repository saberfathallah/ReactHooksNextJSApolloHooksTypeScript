import validationForm from '../validation';

describe("validationForm", () => {
  it("should return error description", () => {
    const values = { description: "" };
    expect(validationForm(values)).toEqual({ description: "Required" });
  });

  it("shouldn't return error description", () => {
    const values = { description: "description" };
    expect(validationForm(values)).toEqual({ });
  });

  it("should return error password", () => {
    const values = { password: "" };
    expect(validationForm(values)).toEqual({ password: "Required" });
  });

  it("shouldn't return error password", () => {
    const values = { password: "password" };
    expect(validationForm(values)).toEqual({ });
  });

  it("should return Required error mail", () => {
    const values = { email: "" };
    expect(validationForm(values)).toEqual({ email: "Required" });
  });

  it("should return invalid error mail", () => {
    const values = { email: "saber@" };
    expect(validationForm(values)).toEqual({ email: "Invalid email address" });
  });

  it("shouldn't return  error mail", () => {
    const values = { email: "email@email.com" };
    expect(validationForm(values)).toEqual({ });
  });
});


