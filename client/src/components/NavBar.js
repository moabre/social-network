import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';

const active = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#2d86ff' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = withRouter(({ history }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' color='inherit'>
          Social-Network
        </Typography>
        <Link to='/'>
          <IconButton aria-label='Home' style={active(history, '/')}>
            <HomeIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
});
export default Menu;
