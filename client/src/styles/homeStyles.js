import { makeStyles } from '@material-ui/core/styles';

const homeStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: 30,
    marginTop: '15%',
  },
  logo: {
    color: '#0F90F3',
    fontWeight: 600,
    margin: '0 auto',
  },
  text: {
    fontWeight: 545,
    margin: '0 auto',
    marginTop: '2rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default homeStyles;
