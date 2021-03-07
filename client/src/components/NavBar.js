import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import NavBarStyles from '../styles/NavBarStyles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import AccountCircle from '@material-ui/icons/AccountCircle';

const active = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#2d86ff' };
  } else {
    return { color: '#ffffff' };
  }
};

const home = () => {
  window.location.href = '/';
};

const NavBar = withRouter(({ history }) => {
  const classes = NavBarStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    dispatch(logoutUser());
    window.location.href = '/';
  };

  return (
    <AppBar position='static'>
      <Toolbar className={classes.root}>
        <Typography variant='h6' color='inherit'>
          Social-Network
        </Typography>
        <div className={classes.container}>
          <Link onClick={home}>
            <IconButton aria-label='Home' style={active(history, '/')}>
              <HomeIcon />
            </IconButton>
          </Link>
          <div>
            <Button
              aria-controls='simple-menu'
              aria-haspopup='true'
              onClick={handleClick}
              className={classes.button}
            >
              <AccountCircle />
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My Account</MenuItem>
              <MenuItem onClick={signOut}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
});
export default NavBar;
