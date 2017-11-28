import { createReducer } from 'redux-act';
import {setDetail} from '../actions';

const detailState=createReducer({
	[setDetail]:(state,payload)=>{ return {...payload}}
},{
	"title": "",
	"english_title": "",
	"url": "",
	"rate": 0,
	"hots":0,
	"cover": "",
	"short_comment": {
		"content": "",
		"author": ""
	},
	"directors": [],
	"actors": [],
	"duration": "",
	"region": "",
	"id": "",
	"types": [],
	"time":"",
	"release_time": ""
});

export default detailState