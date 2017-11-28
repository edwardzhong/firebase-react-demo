import { createAction } from 'redux-act';

export const request=createAction('request')
export const requestSucc=createAction('requestSucc')
export const requestError=createAction('requestError')

export const addList=createAction('addList')
export const emptyList=createAction('emptyList')
export const sortByTime=createAction('sortByTime')
export const sortByRate=createAction('sortByRate')
export const sortByHot=createAction('sortByHot')

export const setDetail=createAction('setDetail');