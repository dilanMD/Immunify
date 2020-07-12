import {AUTH} from '../constants/auth';

const {REGISTER, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} = AUTH;

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

const authReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {...state, loading: true};
    case REGISTER_SUCCESS:
      return {...state, data: payload, loading: false};
    case REGISTER_FAILURE:
      return {...state, error: payload, loading: false};
    default:
      return state;
  }
};

export default authReducer;
