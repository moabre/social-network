import React from 'react';
import Button from '@material-ui/core/Button';
import { unfollowUser, followUser } from '../../actions/userActions';
import { useDispatch } from 'react-redux';

export default function FollowProfileButton({
  userId,
  id,
  following,
  switchButton,
  name,
}) {
  const dispatch = useDispatch();
  const unFollow = () => {
    dispatch(unfollowUser(userId, id));
    dispatch({
      type: 'REDUCE_FOLLOWER',
      id: userId,
    });
    switchButton();
  };
  const follow = () => {
    dispatch(followUser(userId, id));
    dispatch({
      type: 'INCREASE_FOLLOWER',
      user: {
        _id: userId,
        name: name,
      },
    });
    switchButton();
  };

  return (
    <div>
      {following ? (
        <Button variant='contained' color='secondary' onClick={unFollow}>
          Unfollow
        </Button>
      ) : (
        <Button variant='contained' color='primary' onClick={follow}>
          Follow
        </Button>
      )}
    </div>
  );
}
