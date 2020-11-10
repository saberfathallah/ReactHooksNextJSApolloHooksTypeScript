import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    top: '6rem',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validate = (values) => {
  const errors: any = {};
  if (!values.firstName) {
    errors.firstName = 'Veuillez remplir ce champs';
  }
  if (!values.lastName) {
    errors.lastName = 'Veuillez remplir ce champs';
  }
  //   if (!values.date) {
  //     errors.date = 'Veuillez remplir ce champs';
  //   }
  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  if (!values.country) {
    errors.country = 'Veuillez remplir ce champs';
  }

  return errors;
};

const EditProfil = (props: any) => {
  const { user } = props;
  const isUpdate = false;
  const classes = useStyles();


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      // date: '',
      email: user.email,
      country: '',
    },
    validate,
    onSubmit: async (values) => {
      console.log('values', values);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isUpdate ? 'MODIFIER PROFIL' : 'INSCRIPTION'}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Nom"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.firstName}
            helperText={formik.touched.firstName ? formik.errors.firstName : ''}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Prenom"
            name="lastName"
            autoComplete="lastName"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.lastName}
            helperText={formik.touched.lastName ? formik.errors.lastName : ''}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.email}
            helperText={formik.touched.email ? formik.errors.email : ''}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="date"
            label="Date "
            type="date"
            id="date"
            onChange={formik.handleChange}
            value={formik.values.date}
            helperText={formik.touched.date ? formik.errors.date : ''}
            error={formik.touched.date && Boolean(formik.errors.date)}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="country"
            label="Ville"
            name="country"
            autoComplete="country"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.country}
            helperText={formik.touched.country ? formik.errors.country : ''}
            error={formik.touched.country && Boolean(formik.errors.country)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            {isUpdate ? 'MODIFIER PROFIL' : 'INSCRIPTION'}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EditProfil;
