import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Provider } from 'react-redux'
import store from './redux/store'
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.location.search === this.props.location.search
  }
  render() {

    return (

      <Provider store={store}>
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
              <Route exact path="/dashboard" name="Home" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/users" name="Home" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/users/:id" name="Home" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/Profile" name="Home" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/All_Departments" name="All_Departments" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/All_Departments/New" name="New" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/All_Departments/:id" name="New" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/All_Unites" name="Unites" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/All_Unites/New" name="NewUnite" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/All_Unites/details/:name" name="Unites" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/All_Unites/update/:id" name="Unites" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/Training" name="training" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/Training/:id" name="training" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/all_training" name="all_training" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/feedback/:id" name="feedback" render={props => <DefaultLayout {...props} />} />
              <Route exact path="/feedbacks/:id" name="feedbacks" render={props => <DefaultLayout {...props} />} />

              <Route exact path="/" name="Login Page" render={props => <Login {...props} />} />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </Provider>
    );
  }

}

export default App;
