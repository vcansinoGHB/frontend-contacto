import React from 'react';  
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';  
  
const DashboardLayout = ({children, ...rest}) => {  
  return (  
    <div className="page page-dashboard"> 

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
     <a className="navbar-brand" href="#">Contactos App</a>
       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
       </button>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav mr-auto">
         <li className="nav-item active">
              <Link className="nav-link"  to="/contacto">Adminsitrar Contacto</Link>
           </li>
           <li className="nav-item active">
              <Link className="nav-link"  to="/login">Salir</Link>
           </li>
       </ul>
     </div>
    </nav>
    <div id="wrapper">
        <div className="container-fluid">
             {children}             
        </div>
    </div> 

    </div>  
  )  
}  
  
const DashboardLayoutRoute = ({component: Component, ...rest}) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      localStorage.getItem('cookieuser') ?  
      <DashboardLayout>  
          <Component {...matchProps} />  
      </DashboardLayout>
      :
      <Redirect to="/login" />  
    )} />  
    
  )  
};  
  
export default DashboardLayoutRoute;