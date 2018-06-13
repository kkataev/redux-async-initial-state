import { STATE_LOADING_START, STATE_LOADING_DONE, STATE_LOADING_FAILED } from '../src/actionTypes';
import middleware from '../src/middleware';

describe('middleware', () => {
  let currentState = {};
  const dispatch = spy(() => {});
  const getState = () => currentState;
  const store = { dispatch, getState };

  it('dispatches start action immediately', () => {
    const load = () => Promise.resolve({});

    expect(middleware.isLoadExecuted).to.be.equal(undefined);

    middleware(load)(store)(dispatch)();

    expect(dispatch).to.have.been.called.with({
      type: STATE_LOADING_START,
    });

    expect(middleware.isLoadExecuted).to.be.equal(true);
  });

  it('dispatches failed action when promise rejected', () => {
    const load = () => new Promise((resolve, reject) => {
      reject();
      expect(dispatch).to.have.been.called.with({
        type: STATE_LOADING_FAILED,
      });
    });
    middleware(load)(store);
  });

  it('dispatches done action when promise resolved', () => {
    const loadedState = {};
    const load = () => new Promise(resolve => {
      resolve(loadedState);
      expect(dispatch).to.have.been.called.with({
        type: STATE_LOADING_DONE,
        state: loadedState,
      });
    });

    middleware(load)(store);
  });

  it('replaces keys in current state', () => {
    currentState = {
      key1: 'x',
      key2: 'y',
    };


    const load = (state) => new Promise(resolve => {
      resolve(Object.assign(state, {
        key2: 'z',
      }));
      expect(dispatch).to.have.been.called.with({
        type: STATE_LOADING_DONE,
        state: {
          key1: 'x',
          key2: '00',
        },
      });
    });

    middleware(load)(store);
  });

});
