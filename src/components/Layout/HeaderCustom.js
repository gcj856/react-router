import React, {Component} from 'react'
import {Layout, Icon} from 'antd';
import propTypes from 'prop-types'
import styles from './HeaderCustom.module.less';


const {Header} = Layout;

class HeaderCustom extends Component{
  static propTypes = {
    collapsed: propTypes.bool,
    onCollapseChange: propTypes.func
  }
  render () {
    return (
    <Header className={styles.header}>
      <div
       className={styles.button}
       onClick={this.props.onCollapseChange}>
        <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
      </div>
    </Header>
    )
  }
}

export default HeaderCustom;