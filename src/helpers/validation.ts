const validationForm = (values) => {
  let errors = {};
  if (!values.description) {
    errors = {
      ...errors,
      description: "Required",
    };
  }
  return errors;
};

export default validationForm;
