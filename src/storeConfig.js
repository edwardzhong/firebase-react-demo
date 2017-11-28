import { createStore,applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers'
// const initialState = window.__INITIAL_STATE__

const store = createStore(
  rootReducer,
  // initialState,
  applyMiddleware(logger)
);

export default store