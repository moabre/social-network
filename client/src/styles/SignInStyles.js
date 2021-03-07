import { makeStyles } from '@material-ui/core/styles';

const SignInStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
    backgroundColor: '#166FE5',
  },
  button: {
    backgroundColor: '#30ff30',
    color: 'white',
    margin: 'auto',
    marginBottom: theme.spacing(2),
    '&:hover': {
      backgroundColor: 'green',
    },
  },
}));
export default SignInStyles;
