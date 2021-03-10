import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './../user/FollowProfileButton';
// import ProfileTabs from './../user/ProfileTabs';
import { getUser } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useParams } from 'react-router-dom';
import NavBar from '../NavBar';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: '1em',
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
}));

export default function User({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const state = useSelector((state) => state);

  const {
    authReducer: {
      user: { _id },
    },
  } = state;

  const {
    user: { currUser, followers, following },
  } = state;

  const loggedInUser = _id;
  const profileUser = userId;
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    following: false,
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dispatch(getUser(profileUser));
  }, [profileUser]);

  useEffect(() => {
    if (JSON.stringify(currUser) !== JSON.stringify({})) {
      setValues({
        ...values,
        following: checkFollowing(currUser, loggedInUser),
      });
    }
  }, [currUser]);

  const checkFollowing = (user, userId) => {
    const match = user.followers.some((follower) => follower._id == userId);
    return match;
  };

  const switchButton = () => {
    setValues({
      following: !values.following,
    });
  };

  // const clickFollowButton = (callApi) => {
  //   callApi(
  //     {
  //       userId: jwt.user._id,
  //     },
  //     {
  //       t: jwt.token,
  //     },
  //     values.user._id
  //   ).then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setValues({ ...values, user: data, following: !values.following });
  //     }
  //   });
  // };
  // const loadPosts = (user) => {
  //   listByUser(
  //     {
  //       userId: user,
  //     },
  //     {
  //       t: jwt.token,
  //     }
  //   ).then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setPosts(data);
  //     }
  //   });
  // };
  // const removePost = (post) => {
  //   const updatedPosts = posts;
  //   const index = updatedPosts.indexOf(post);
  //   updatedPosts.splice(index, 1);
  //   setPosts(updatedPosts);
  // };

  // const photoUrl = values.user._id
  //   ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
  //   : '/api/users/defaultphoto';
  // if (values.redirectToSignin) {
  //   return <Redirect to='/signin' />;
  // }
  return (
    <>
      <NavBar />
      <Paper className={classes.root} elevation={4}>
        <Typography variant='h6' className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={''} className={classes.bigAvatar} />
            </ListItemAvatar>
            <ListItemText primary={currUser.name} secondary={currUser.email} />{' '}
            {_id === currUser._id ? (
              <ListItemSecondaryAction>
                <Link to={'/user/edit/' + values.user._id}>
                  <IconButton aria-label='Edit' color='primary'>
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={values.user._id} />
              </ListItemSecondaryAction>
            ) : (
              <FollowProfileButton
                following={values.following}
                id={profileUser}
                userId={loggedInUser}
                switchButton={switchButton}
              />
            )}
          </ListItem>
          <Divider />
          {/* <ListItem>
            <ListItemText
              primary={values.user.bio}
              secondary={'Joined: ' + new Date(currUser.created).toDateString()}
            />
          </ListItem> */}
        </List>
        {/* <ProfileTabs
        user={values.user}
        posts={posts}
        removePostUpdate={removePost}
      /> */}
      </Paper>
    </>
  );
}