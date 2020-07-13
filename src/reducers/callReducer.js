import {CALL} from '../constants/call';
const {OUTGOING_REQUEST, OUTGOING_SUCCESS, OUTGOING_FAILURE} = CALL;

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

const callReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case OUTGOING_REQUEST:
      return {...state, loading: true};
    case OUTGOING_SUCCESS:
      return {...state, data: payload, loading: false};
    case OUTGOING_FAILURE:
      return {...state, error: payload, loading: false};
    default:
      return state;
  }
};

export default callReducer;
