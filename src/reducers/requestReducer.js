import { createReducer } from 'redux-act';
import {request,requestSucc,requestError} from '../actions';

const requestState = createReducer({
  [request]: (state,payload) => Object.assign({},state,{
  	isFetching:true,
  	param:payload 
  }),
  [requestSucc]: (state, payload) => Object.assign({},state,{
  	isFetching:false,
  	data:payload.subject
  }),
  [requestError]: (state, payload) => Object.assign({},state,{
  	isFetching:false,
  	err:'error'
  })
}, {
	isFetching:true,
	data:null,
	param:null,
	err:null
});

export default requestState