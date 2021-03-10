import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PostList from './PostList';
import NewPost from './NewPost';
import { useDispatch, useSelector } from 'react-redux';
import { getPostFeed } from '../../actions/postActions';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: '1em',
  },
  media: {
    minHeight: 330,
  },
}));
export default function Newsfeed() {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const {
    authReducer: {
      user: { _id },
    },
  } = state;
  const {
    posts: { posts },
  } = state;
  const {
    user: { following },
  } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostFeed(_id));
  }, []);
  useEffect(() => {
    dispatch(getPostFeed(_id));
  }, [following]);

  return (
    <Card className={classes.card}>
      <Typography type='title' className={classes.title}>
        Newsfeed
      </Typography>
      <Divider />
      <NewPost />
      <Divider />
      <PostList posts={posts} />
    </Card>
  );
}
