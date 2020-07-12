import axios from 'axios';
import {BASE_URL} from '../constants/credentials';
import {AUTH} from '../constants/auth';
const {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} = AUTH;

export const registerRequest = () => ({type: REGISTER_REQUEST});
export const registerFailure = (failure) => ({
  type: REGISTER_FAILURE,
  payload: failure,
});
export const registerSuccess = (success) => ({
  type: REGISTER_SUCCESS,
  payload: success,
});

export const register = () => {
  return (dispatch) => {
    dispatch(registerRequest());
    axios
      .post(`${BASE_URL}/register`)
      .then((data) => {
        // dispatch(registerSuccess(data));
        console.log(data);
      })
      .catch((err) => {
        // dispatch(registerFailure(err));
        console.log(err);
      });
  };
};
