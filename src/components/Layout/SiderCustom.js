import React, {Component} from 'react'
import {withRouter,Link} from 'react-router-dom'
import RouteConfig from '../../routes/config'
import propTypes from 'prop-types';
import "./SiderCustom.less";
import { Menu, Icon, Layout } from 'antd';

const { SubMenu } = Menu;

class SiderCustom extends Component{
  static propTypes = {
    collapsed : propTypes.bool
  }
 
  static getDerivedStateFromProps(props, state) {
    if (props.collapsed !== state.collapsed || props.location.pathname !== SiderCustom.pathname) {
      SiderCustom.pathname = props.location.pathname
      return {
        collapsed: props.collapsed,
        ...SiderCustom.setMenuOpen(props),
      }
    }
    return null
  }

  static setMenuOpen = (props) => {
    const {pathname} = props.location;
    return{
      openKey: props.collapsed ? [] : SiderCustom.openKey,
      selectedKey: pathname
    }
  }
  static openKey = [];
  static pathname = '';

  state = {
    openKey: [],
    selectedKey: '',
    collapsed: false
  }
  componentDidMount () {
    SiderCustom.openKey = [this.props.location.parentKey] || [];
    SiderCustom.pathname = this.props.location.pathname;
    const state = SiderCustom.setMenuOpen(this.props);
    this.setState(state);
  }

  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });
  }

  openMenu = v => {
    SiderCustom.openKey = v;
    this.setState({
      openKey:v
    })
  }
  renderMenuItem = (r) => {
    return (
    <Menu.Item key={r.key}>
      <Link to={(r.key || r.path)+(r.query || '')}>
        {r.icon && <Icon type={r.icon} />}
        <span>{r.title}</span>
      </Link>
    </Menu.Item>
    )
  }
  renderMenuSubItem = (r) => {
    return (
      <SubMenu
          key={r.key}
          title={
            <span>
              {r.icon && <Icon type={r.icon} />}
              <span>{r.title}</span>
            </span>
          }
        >
        {
          r.subs.map(s => this.renderMenuItem(s))
        }
      </SubMenu>
    )
  }
  

  render () {
   
    return (
      <Layout.Sider
      width={240}
      trigger={null}
      collapsible
      collapsed={this.props.collapsed}
      >
        
        <h1 className="title">SiderCustom</h1>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[this.state.selectedKey]}
          openKeys={this.state.openKey}
          onClick={this.menuClick}
          onOpenChange={this.openMenu}
        >
          {RouteConfig.map(r => r.component ? this.renderMenuItem(r) : this.renderMenuSubItem(r))}
        </Menu>
       
      </Layout.Sider>
    
    )
  }
}

export default withRouter(SiderCustom);