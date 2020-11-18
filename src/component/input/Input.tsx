import TextField from "@material-ui/core/TextField";

interface InputProps {
  handleChange: any;
  handleBlur: any;
  values: {
    description: string;
  },
  label: string;
  variables: any;
  errors: {
    description: string;
  }
  touched: any
  style: any
}

const Input = (props: InputProps) => {
  const {
    handleChange,
    handleBlur,
    values,
    label,
    variables,
    errors,
    touched,
    style
  } = props;

  return (
    <>
      <TextField
        type="description"
        name="description"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.description}
        id={`${variables.description}standard-full-width`}
        label={label}
        style={{ ...style }}
        placeholder=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      {errors.description && touched.description && errors.description}
    </>
  );
};

export default Input;
