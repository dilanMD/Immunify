import {USER} from '../constants/user';

const {GET_FCM_REQUEST, GET_FCM_SUCCESS, GET_FCM_FAILURE, SET_MOBILE} = USER;

const INITIAL_STATE = {
  loading: false,
  userData: null,
  mobile: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case GET_FCM_REQUEST:
      return {...state, loading: true};
    case GET_FCM_SUCCESS:
      return {...state, loading: false, userData: payload};
    case GET_FCM_FAILURE:
      return {...state, loading: false, error: payload};
    case SET_MOBILE:
      return {...state, mobile: payload};
    default:
      return state;
  }
};

export default userReducer;
