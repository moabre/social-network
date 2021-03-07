import { makeStyles } from '@material-ui/core/styles';

const NavBarStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: '0 auto',
    height: '100%',
    color: 'white',
  },
}));
export default NavBarStyles;
