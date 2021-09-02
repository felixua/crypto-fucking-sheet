import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './pages/dashboard/dashboard.component';
import SignIn from './pages/sign-in/sign-in.component';
import SignUp from './pages/sign-up/sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';


import './App.scss';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });

          console.log(this.state);
        });
      }

      setCurrentUser(userAuth);
    
    /*  
      
      if (this.state.currentUser === null) {
        this.props.history.push("/sign-in");
      } else {
        this.props.history.push("/");
      }

    */

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div id="app">
        <Switch>
          <Route exact path="/" render={ () => this.props.currentUser === null ? (
                <Redirect to="/sign-in"/>
              ) : (
                <Dashboard />
              )
            }  
          />
          <Route exact path="/sign-in" render={() => this.props.currentUser === null ? (
                <SignIn />
              ) : ( 
                <Redirect to="/" />
              )
            } 
          />
          <Route exact path="/sign-up" component={SignUp} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) 
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
