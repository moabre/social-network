import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/postActions';
import app from '../../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing(3)}px 0px 1px`,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none',
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  photoButton: {
    height: 30,
    marginBottom: 5,
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%',
  },
  submit: {
    margin: theme.spacing(2),
  },
  filename: {
    verticalAlign: 'super',
  },
}));

export default function NewPost(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    authReducer: { user },
  } = state;
  const [values, setValues] = useState({
    text: '',
    photo: '',
    error: '',
    userCurrent: {},
  });
  useEffect(() => {
    setValues({ ...values, userCurrent: user });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const clickPost = () => {
    if (values.photo) {
      let file = document.getElementById('icon-button-file').files[0];
      let storageRef = app.storage().ref('images/' + file.name);
      storageRef
        .put(file)
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          const text = values.text;
          const photo = url;
          dispatch(createPost(text, user._id, photo));
          setValues({
            ...values,
            text: '',
            photo: '',
          });
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(createPost(values.text, user._id));
      setValues({
        ...values,
        text: '',
      });
    }
  };
  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={user.avatar} />}
          title={user.name}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <TextField
            placeholder='Share your thoughts ...'
            multiline
            rows='3'
            value={values.text}
            onChange={handleChange('text')}
            className={classes.textField}
            margin='normal'
          />
          <input
            accept='image/*'
            onChange={handleChange('photo')}
            className={classes.input}
            id='icon-button-file'
            type='file'
          />
          <label htmlFor='icon-button-file'>
            <IconButton
              color='secondary'
              className={classes.photoButton}
              component='span'
            >
              <PhotoCamera />
            </IconButton>
          </label>{' '}
          <span className={classes.filename}>
            {values.photo ? values.photo.name : ''}
          </span>
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
            disabled={values.text === ''}
            onClick={clickPost}
            className={classes.submit}
          >
            POST
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
