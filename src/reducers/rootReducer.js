import {combineReducers} from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import callReducer from './callReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  call: callReducer,
});

export default rootReducer;
