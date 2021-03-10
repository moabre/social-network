import React, { useState } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment } from '../../actions/postActions';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: '96%',
  },
  commentText: {
    backgroundColor: 'white',
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`,
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em',
  },
  commentDelete: {
    fontSize: '1.6em',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
}));

export default function Comments({ postId, comments }) {
  const classes = useStyles();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    authReducer: {
      user: { _id },
    },
  } = state;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const addsComment = (event) => {
    if (event.keyCode == 13 && event.target.value) {
      event.preventDefault();
      const comment = {
        text: text,
      };
      dispatch(addComment(postId, _id, comment));
      setText('');
    }
  };

  const deletesComment = (commented) => {
    const comment = {
      _id: commented,
    };
    dispatch(deleteComment(comment, postId));
  };

  const commentBody = (item) => {
    return (
      <p className={classes.commentText}>
        <Link to={'/user/' + item.postedBy._id}>{item.postedBy.name}</Link>
        <br />
        {item.text}
        <span className={classes.commentDate}>
          {new Date(item.timestamp).toDateString()} |
          {_id === item.postedBy._id && (
            <Icon
              onClick={() => deletesComment(item._id)}
              className={classes.commentDelete}
            >
              <DeleteIcon style={{ fontSize: 16 }} />
            </Icon>
          )}
        </span>
      </p>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={<Avatar className={classes.smallAvatar} src={''} />}
        title={
          <TextField
            onKeyDown={addsComment}
            multiline
            value={text}
            onChange={handleChange}
            placeholder='Write something ...'
            className={classes.commentField}
            margin='normal'
          />
        }
        className={classes.cardHeader}
      />
      {comments.map((item, i) => {
        return (
          <CardHeader
            avatar={<Avatar className={classes.smallAvatar} src={''} />}
            title={commentBody(item)}
            className={classes.cardHeader}
            key={i}
          />
        );
      })}
    </div>
  );
}
