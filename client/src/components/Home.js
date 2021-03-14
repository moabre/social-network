import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import homeStyles from '../styles/homeStyles';
import Signin from './SignIn';
import NavBar from './NavBar';
import Newsfeed from './newsfeed/Feed';
import FindPeople from './FindPeople';
import { useSelector } from 'react-redux';

const Home = () => {
  const state = useSelector((state) => state);
  const {
    authReducer: { isAuthenticated },
  } = state;
  const classes = homeStyles();
  return (
    <div>
      {!isAuthenticated && (
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12} sm className={classes.container}>
              <Typography variant='h4' color='primary' className={classes.logo}>
                socialNetwork
              </Typography>
              <Typography variant='h6' color='primary' className={classes.text}>
                Welcome to the network!
              </Typography>
            </Grid>
            <Grid item xs={12} sm>
              <Signin />
            </Grid>
          </Grid>
        </div>
      )}
      {isAuthenticated && (
        <>
          <NavBar />
          <Grid container spacing={8}>
            <Grid item xs={8} sm={7}>
              <Newsfeed />
            </Grid>
            <Grid item xs={6} sm={5}>
              <FindPeople />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Home;
