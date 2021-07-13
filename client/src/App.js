import React,{Fragment} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/Layout/Navbar';
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './context/contact/ContactState';
import AlertState from './context/alert/AlertState';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Alerts from './components/Layout/Alerts';
import AuthState2 from './context/Auth/AuthState2';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

const App = ()=>{
  return(
    <AuthState2>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar/>
              <div className="container">
                <Alerts/>
                <Switch>
                  <PrivateRoute exact path='/' component={Home}/>
                  <Route exact path='/about' component={About}/>
                  <Route exact path='/register' component={Register}/>
                  <Route exact path='/login' component={Login}/>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState2>
  )  
}

export default App;
