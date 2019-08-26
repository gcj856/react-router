import React, {Component} from 'react';
import { Route, Switch, Redirect  } from "react-router-dom";
import config from './config';
import qs from 'query-string'
import NotFound from '../pages/NotFound'

class Routes extends Component{
  renderRoutes = (r) => {
    return true ? 
    <Route 
      key={r.key}
      exact
      path={r.key}
      render={props=>{
        const {search} = props.location
        if (r.parentKey) {
          props.location.parentKey = r.parentKey
        }
        props.location.title = r.title
        props.location.searchParams = qs.parse(search)
        props.rootStore = this.props.rootStore
        return <r.component {...props}/>
      }}
    
    /> 
    : 
    <Redirect 
      key='login'
      to={{
        pathname: '/login',
        state: {from: this.props.location}
      }} 
    />
  }
  /**
   * 递归函数
   */
  mapRoutes = (routes) => {
    return routes.map((r)=>{
        if(r.component){
          return this.renderRoutes(r);
        }else if(r.subs){
          return this.mapRoutes(r.subs)
        }else{
          return null;
        }
    })
  }

  render () {
    return (
      <Switch location={this.props.location}>
        {this.mapRoutes(config)}
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default Routes