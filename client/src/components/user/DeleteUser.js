import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../actions/userActions';

export default function DeleteUser({ userId }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const clickButton = () => {
    setOpen(true);
  };
  const deleteAccount = () => {
    dispatch(deleteUser(userId));
  };
  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <IconButton aria-label='Delete' color='secondary' onClick={clickButton}>
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{'Delete Account'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color='primary'>
            Cancel
          </Button>
          <Button
            color='secondary'
            autoFocus='autoFocus'
            onClick={deleteAccount}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
