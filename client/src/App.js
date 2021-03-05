import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import Home from './components/Home';
import Signup from './components/SignUp';

export const history = createBrowserHistory();

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route patch='/signup' component={Signup} />
          </Switch>
        </Router>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
