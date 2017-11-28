import { combineReducers } from 'redux'
import requestState from './requestReducer'
import listState from './listReducer'
import detailState from './detailReducer'
// import { fromJS } from 'immutable';

const rootReducer = combineReducers({
  requestState,
  listState,
  detailState
});

export default rootReducer