import * as actions from './actionTypes';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
};

export default function innerReducer(state = initialState, action) {
  switch (action.type) {
    case actions.STATE_LOADING_START:
      return {
        loaded: false,
        error: null,
        loading: true,
      };
    case actions.STATE_LOADING_DONE:
      return {
        loaded: true,
        error: null,
        loading: false,
      };
    case actions.STATE_LOADING_FAILED:
      return {
        loaded: false,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
}
