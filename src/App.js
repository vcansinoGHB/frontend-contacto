import { Router, Redirect, Switch } from 'react-router-dom';

import LoginLayoutRoute from "./layouts/LoginLayout";  
import DashboardLayoutRoute from "./layouts/DashboardLayout";  

import {Login} from './Login';
import {Contacto} from './Contacto'; 
import HomePage from './pages/HomePage';

import {history} from './helpers';


function App() {
  return (
    <Router history={history}>
    <Switch> 
        <DashboardLayoutRoute exact path="/home" component={HomePage} />   
        <DashboardLayoutRoute exact path="/contacto" component={Contacto} />      
        <LoginLayoutRoute exact path="/login" component={Login} />
       <Redirect from="*" to="/login" />
    </Switch>
  </Router>
  );
}

export default App;
