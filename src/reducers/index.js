import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { contactos } from './contacto.reducer';

const rootReducer = combineReducers({
  contactos,
  authentication,
  alert
});

export default rootReducer;