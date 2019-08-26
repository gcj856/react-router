import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable'; //按需加载库
import {Spin} from 'antd';

import './App.less'


//按需加载
var login = Loadable({
  loader:()=>import('./pages/Login/Login'),
  loading(){
    return <Spin />
  }
})
var main = Loadable({
  loader:()=>import('./Main'),
  loading(){
    return <Spin />
  }
})
var notFound = Loadable({
  loader:()=>import('./pages/NotFound'),
  loading(){
    return <Spin />
  }
})

function App() {
  
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/app/dashboard' push />} />
            <Route exact path='/login' component={login} />
            <Route path='/app' component={main} />
            <Route path='*' component={notFound} />
          </Switch> 
      </Router>
    </div>
  );
}

export default App;
