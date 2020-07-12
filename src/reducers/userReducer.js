import {USER} from '../constants/user';

const {GET_FCM_REQUEST, GET_FCM_SUCCESS, GET_FCM_FAILURE} = USER;

const INITIAL_STATE = {
  loading: false,
  userData: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case GET_FCM_REQUEST:
      return {...state, loading: true};
    case GET_FCM_SUCCESS:
      return {...state, loading: false, user: payload};
    case GET_FCM_FAILURE:
      return {...state, loading: false, error: payload};
    default:
      return state;
  }
};

export default userReducer;
