import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postLike, postUnlike, deletePost } from '../../actions/postActions';
import Comments from './Comments';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  cardContent: {
    backgroundColor: 'white',
    padding: `${theme.spacing(2)}px 0px`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  photo: {
    textAlign: 'center',
    backgroundColor: '#f2f5f4',
    padding: theme.spacing(1),
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Post(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    authReducer: {
      user: { _id },
    },
  } = state;
  const {
    posts: { posts },
  } = state;

  const checkLike = (likers, id) => {
    let match = likers.findIndex((i) => i._id === id) !== -1;
    return match;
  };
  const [values, setValues] = useState({
    like: checkLike(props.post.likers, _id),
    likes: props.post.likers.length,
    comments: props.post.comments,
  });

  useEffect(() => {
    setValues({
      ...values,
      like: checkLike(props.post.likers, _id),
      likes: props.post.likers.length,
      comments: props.post.comments,
    });
  }, [posts]);

  const clickLike = () => {
    dispatch(postLike(props.post._id, _id));
  };

  const clickUnlike = () => {
    dispatch(postUnlike(props.post._id, _id));
  };

  const deletePosts = () => {
    dispatch(deletePost(props.post._id));
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={props.post.postedBy.avatar} />}
        action={
          props.post.postedBy._id === _id && (
            <IconButton onClick={deletePosts}>
              <DeleteIcon />
            </IconButton>
          )
        }
        title={
          <Link to={'/user/' + props.post.postedBy._id}>
            {props.post.postedBy.name}
          </Link>
        }
        subheader={new Date(props.post.timestamp).toDateString()}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography component='p' className={classes.text}>
          {props.post.text}
        </Typography>
        {props.post.photo && (
          <div className={classes.photo}>
            <img
              className={classes.media}
              src={'/api/posts/photo/' + props.post._id}
            />
          </div>
        )}
      </CardContent>
      <CardActions>
        {values.like ? (
          <IconButton
            onClick={clickUnlike}
            className={classes.button}
            aria-label='Like'
            color='secondary'
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={clickLike}
            className={classes.button}
            aria-label='Unlike'
            color='secondary'
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}{' '}
        <span>{values.likes}</span>
        <IconButton
          className={classes.button}
          aria-label='Comment'
          color='secondary'
        >
          <CommentIcon />
        </IconButton>{' '}
        <span>{values.comments.length}</span>
      </CardActions>
      <Divider />
      <Comments postId={props.post._id} comments={values.comments} />
    </Card>
  );
}
