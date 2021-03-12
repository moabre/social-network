import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import SignInStyles from '../styles/SignInStyles';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { history } from '../App';

export default function Signin(props) {
  const classes = SignInStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { error } = state;
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: {
      data: '',
    },
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    dispatch(loginUser(user));
  };

  const redirectSignIn = () => {
    history.push('/signup');
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    if (JSON.stringify(error) !== '{}') {
      setValues({ ...values, error: error });
    }
  }, [error]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          id='email'
          type='email'
          label='Email'
          className={classes.textField}
          value={values.email}
          onChange={handleChange('email')}
          margin='normal'
        />
        <br />
        {values.error.data.email && (
          <Typography component='p' color='error'>
            {values.error.data.email}
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
        <br />{' '}
        {values.error.data.password && (
          <Typography component='p' color='error'>
            {values.error.data.password}
          </Typography>
        )}
        {values.error.data.error && (
          <Typography component='p' color='error'>
            {values.error.data.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color='primary'
          variant='contained'
          onClick={clickSubmit}
          className={classes.submit}
        >
          Sign In
        </Button>
      </CardActions>
      <CardActions>
        <Button
          variant='contained'
          onClick={redirectSignIn}
          className={classes.button}
        >
          Create New Account
        </Button>
      </CardActions>
    </Card>
  );
}
