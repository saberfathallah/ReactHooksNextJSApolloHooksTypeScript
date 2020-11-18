interface Values {
  email: string;
  name: string;
  password: string;
  description: string;
}
const validationForm = (values) => {
  let errors: Partial<Values> = {};
  if (values.description !== undefined && !values.description) {
    errors = {
      ...errors,
      description: "Required",
    };
  }
  if (values.name !== undefined && !values.name) {
    errors = {
      ...errors,
      name: "Required",
    };
  }
  if (values.password !== undefined && !values.password) {
    errors.password = "Required";
  }
  if (values.email !== undefined && !values.email) {
    errors.email = "Required";
  } else if (
    values.email !== undefined &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

export default validationForm;
