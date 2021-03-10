import React from 'react';
import Button from '@material-ui/core/Button';
import { unfollowUser, followUser, getUser } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

export default function FollowProfileButton({
  userId,
  id,
  following,
  switchButton,
}) {
  const dispatch = useDispatch();
  const unFollow = () => {
    dispatch(unfollowUser(userId, id));
    switchButton();
  };
  const follow = () => {
    dispatch(followUser(userId, id));
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
