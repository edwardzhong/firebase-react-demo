import React,{Component} from 'react'
import {render} from 'react-dom'
import { assignAll } from 'redux-act';
import { Provider,connect } from 'react-redux'
import { HashRouter,hashHistory, Route, Link, Switch, Redirect } from 'react-router-dom'
import Home from './containers/Home'
import Detail from './containers/Detail'
import store from './storeConfig'
import * as actions from './actions'
import './less/main.less'

assignAll(actions, store);

render(
	<Provider store={store}>
	<HashRouter history={hashHistory}>
      <div>
        <Switch>
          <Route exact path="/" render={() => (
            <Redirect to="/home"/>
          )}/>
          <Route path="/home" component={Home} />
          <Route path="/detail/:id" component={Detail} />
          <Route component={Home} />
        </Switch>
      </div>
    </HashRouter>
    </Provider>,
	document.getElementById('app')
)