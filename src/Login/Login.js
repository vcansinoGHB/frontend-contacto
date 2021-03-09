import React from 'react'
import { connect } from 'react-redux';
import { userActions } from '../actions';
import './Login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
        username: '',
        password: '',
        submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(e) {
  const { name, value } = e.target;
  this.setState({ [name]: value });
}

handleSubmit(e) {
  e.preventDefault();

  this.setState({ submitted: true });
  const { username, password } = this.state;
  const { dispatch } = this.props;
  if (username && password) {
      dispatch(userActions.login(username, password));
  }
}
    

render() {

  const { loggingIn,result } = this.props;
  const { username, password, submitted } = this.state;

  return (<div className="container">
          <div className="card card-login mx-auto mt-5">
             <div className="card-header">Login</div>
             <div className="card-body">
               { result &&
                
                   <div className="alert alert-danger" role="alert">
                   Usuario Incorrecto, favor de verificar
                   </div>
               }
             <form onSubmit={this.handleSubmit}>
             <fieldset>
              <fieldset className="form-group">
                   <input className="form-control"
                          type="text" name="username"
                          value={username} 
                          onChange={this.handleChange} 
                          placeholder="Usuario" required/>
               </fieldset>
               <fieldset className="form-group">
                  <input className="form-control"
                         type="password" name="password"
                         value={password} 
                         onChange={this.handleChange}
                         placeholder="Password" maxLength="20" required/>
               </fieldset>
               <button className="btn btn-sm btn-primary btn-block" type="submit">Aceptar  </button>
               {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
              </fieldset>
            </form>  
            </div>
          </div>
        </div>)
}

}

function mapStateToProps(state) {
  const { loggingIn,result } = state.authentication;
  return {
      loggingIn,result
  };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login }; 