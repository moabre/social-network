import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import FileUpload from '@material-ui/icons/AddPhotoAlternate';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, Link, useParams } from 'react-router-dom';
import { getUser } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar';
import { updateCurrentUser } from '../../actions/authActions';
import { history } from '../../App';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: 'black',
  },
  error: {
    verticalAlign: 'middle',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  input: {
    display: 'none',
  },
  filename: {
    marginLeft: '10px',
  },
}));

export default function EditProfile({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profileUser = userId;
  const state = useSelector((state) => state);
  const { error } = state;
  const {
    user: { currUser },
  } = state;

  const {
    authReducer: {
      user: { _id },
      redirectToProfile,
    },
  } = state;
  const loggedInUser = _id;
  const [values, setValues] = useState({
    name: '',
    about: '',
    photo: '',
    email: '',
    showEmail: '',
    issues: '',
    id: '',
  });

  useEffect(() => {
    dispatch(getUser(profileUser));
  }, [profileUser]);

  useEffect(() => {
    if (JSON.stringify(currUser) !== JSON.stringify({})) {
      setValues({
        ...values,
        id: currUser._id,
        name: currUser.name,
        email: currUser.email,
        about: currUser.bio,
        showEmail: String(currUser.showEmail),
      });
    }
  }, [currUser]);

  useEffect(() => {
    if (error.message) {
      setValues({ ...values, issues: error });
    } else if (JSON.stringify(error) !== '{}') {
      setValues({ ...values, error: error });
    }
  }, [error]);

  useEffect(() => {
    if (redirectToProfile) {
      history.push(`/user/${profileUser}`);
      dispatch({
        type: 'CLEAN UP',
      });
    }
  }, [redirectToProfile]);

  const clickSubmit = () => {
    const equal = values.showEmail === 'true';
    let updates = {
      avatar: '',
      bio: values.about,
      email: values.email,
      name: values.name,
      showEmail: equal ? true : false,
    };
    dispatch(updateCurrentUser(updates, loggedInUser));
  };
  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
  if (loggedInUser !== profileUser) {
    return (
      <>
        <NavBar />
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='h6' className={classes.title}>
              You can't edit this profile!
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h6' className={classes.title}>
            Edit Profile
          </Typography>
          <Avatar src={''} className={classes.bigAvatar} />
          <br />
          <input
            accept='image/*'
            onChange={handleChange('photo')}
            className={classes.input}
            id='icon-button-file'
            type='file'
          />
          <label htmlFor='icon-button-file'>
            <Button variant='contained' color='default' component='span'>
              Upload
              <FileUpload />
            </Button>
          </label>{' '}
          <span className={classes.filename}>
            {values.photo ? values.photo.name : ''}
          </span>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Show Email</FormLabel>
            <RadioGroup
              aria-label='gender'
              name='gender1'
              value={values.showEmail}
              onChange={handleChange('showEmail')}
              row
            >
              <FormControlLabel value='true' control={<Radio />} label='Yes' />
              <FormControlLabel value='false' control={<Radio />} label='No' />
            </RadioGroup>
          </FormControl>
          <br />
          <TextField
            id='name'
            label='Name'
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin='normal'
          />
          <br />
          <TextField
            id='multiline-flexible'
            label='About'
            multiline
            rows='2'
            value={values.about}
            onChange={handleChange('about')}
            className={classes.textField}
            margin='normal'
          />
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
          <br />{' '}
          {values.issues.message && (
            <Typography component='p' color='error'>
              {values.issues.message}
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
            Submit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
