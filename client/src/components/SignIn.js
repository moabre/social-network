import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/authActions';

const useStyles = makeStyles((theme) => ({
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
    color: theme.palette.openTitle,
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
  },
  button: {
    backgroundColor: '#30ff30',
    color: 'white',
    margin: 'auto',
    marginBottom: theme.spacing(2),
    '&:hover': {
      backgroundColor: 'green',
    },
  },
}));

export default function Signin(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
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
    window.location.href = '/signin';
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

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
        {values.error && (
          <Typography component='p' color='error'>
            <Icon color='error' className={classes.error}>
              error
            </Icon>
            {values.error}
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
