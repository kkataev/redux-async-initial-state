import { STATE_LOADING_DONE, STATE_LOADING_FAILED, STATE_LOADING_START } from './actionTypes';

export default load => store => {
  store.dispatch({
    type: STATE_LOADING_START,
  });
  load(store.getState(), store.getState).then(
    state => {
      store.dispatch({
        type: STATE_LOADING_DONE,
        payload: { state },
      });
    },
    error => {
      store.dispatch({
        type: STATE_LOADING_FAILED,
        payload: { error },
      });
    }
  );
  return next => action => next(action);
};
