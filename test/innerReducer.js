import { STATE_LOADING_START, STATE_LOADING_DONE, STATE_LOADING_FAILED } from '../src/actionTypes';
import innerReducer from '../src/innerReducer';

describe('innerReducer', () => {
  it('has correct default state', () => {
    const state = innerReducer(undefined, {});
    assert.strictEqual(state.loaded, false);
    assert.strictEqual(state.loading, false);
    assert.strictEqual(state.error, null);
  });

  it('changes loading on start action', () => {
    const state = innerReducer(undefined, {
      type: STATE_LOADING_START,
    });
    assert.strictEqual(state.loaded, false);
    assert.strictEqual(state.loading, true);
    assert.strictEqual(state.error, null);
  });

  it('changes error on error action', () => {
    const state = innerReducer(undefined, {
      type: STATE_LOADING_FAILED,
      payload: { error: new Error('err') },
    });
    assert.strictEqual(state.loaded, false);
    assert.strictEqual(state.loading, false);
    assert.strictEqual(state.error.message, 'err');
  });

  it('changes loaded on done action', () => {
    const state = innerReducer(undefined, {
      type: STATE_LOADING_DONE,
      state: {},
    });
    assert.strictEqual(state.loaded, true);
    assert.strictEqual(state.loading, false);
    assert.strictEqual(state.error, null);
  });
});
