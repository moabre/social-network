import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/authActions';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '15%',
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
    color: '#166FE5',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
    backgroundColor: '#166FE5',
    '&:hover': {
      backgroundColor: '#297cea',
    },
  },
  signin: {
    backgroundColor: '#166FE5',
    '&:hover': {
      backgroundColor: '#297cea',
    },
  },
}));

export default function Signup() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { error } = state;

  const [values, setValues] = useState({
    name: '',
    password: '',
    passwordConfirm: '',
    email: '',
    open: false,
    error: '',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      passwordConfirm: values.passwordConfirm || undefined,
    };
    dispatch(registerUser(user));
  };

  const home = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    if (error.success) {
      setValues({ ...values, open: true });
    } else if (JSON.stringify(error) !== '{}') {
      setValues({ ...values, error: error });
    }
  }, [error]);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h4' className={classes.title}>
            Sign Up
          </Typography>
          <TextField
            id='name'
            label='Name'
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin='normal'
          />
          {values.error.name && (
            <Typography component='p' color='error'>
              {values.error.name}
            </Typography>
          )}
          <br />
          <TextField
            id='email'
            type='email'
            label='Email'
            className={classes.textField}
            value={values.email}
            onChange={handleChange('email')}
            margin='normal'
          />
          {values.error.email && (
            <Typography component='p' color='error'>
              {values.error.email}
            </Typography>
          )}
          {values.error.error && (
            <Typography component='p' color='error'>
              {values.error.error}
            </Typography>
          )}
          <br />
          <TextField
            id='password'
            type='password'
            label='Password'
            className={classes.textField}
            value={values.password}
            onChange={handleChange('password')}
            margin='normal'
          />
          {values.error.password && (
            <Typography component='p' color='error'>
              {values.error.password}
            </Typography>
          )}
          <br />
          <TextField
            id='passwordConfirm'
            type='password'
            label='Confirm Password'
            className={classes.textField}
            value={values.passwordConfirm}
            onChange={handleChange('passwordConfirm')}
            margin='normal'
          />
          {values.error.passwordConfirm && (
            <Typography component='p' color='error'>
              {values.error.passwordConfirm}
            </Typography>
          )}
          <br />{' '}
        </CardContent>
        <CardActions>
          <Button
            color='primary'
            variant='contained'
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>

      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to='/signin'>
            <Button
              color='primary'
              autoFocus='autoFocus'
              variant='contained'
              onClick={home}
              className={classes.signin}
            >
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
