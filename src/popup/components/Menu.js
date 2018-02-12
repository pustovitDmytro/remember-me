import React, { Component } from 'react';

import { Menu, Avatar, Icon } from 'antd';
import s from '../styles/Menu.scss';
const { SubMenu, Item } = Menu;

class AppMenu extends Component {
  state = {
      current: 'mail',
  }

  handleClick = e => {
      this.setState({
          current: e.key,
      });
  }

  render() {
      const img = 'https://brightcove04pmdo-a.akamaihd.net/3653334524001/3653334524001_5381043941001_5379748916001-vs.jpg?pubId=3653334524001&videoId=5379748916001';
      return (
          <Menu
              className={s.container}
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal">

              <Item key="home">
                  <Icon type="home" />Home
              </Item>
              <Item key="browse" disabled>
                  <Icon type="cloud-o" />Lists
              </Item>
              <SubMenu title={<span><Icon type="setting" />Settings</span>}>
                  <Item key="setting:1">Option 1</Item>
                  <Item key="setting:2">Option 2</Item>
                  <Item key="setting:3">Option 3</Item>
                  <Item key="setting:4">Option 4</Item>
              </SubMenu>
              <Item key="feedback">
                  <a href="https://github.com/pustovitDmytro/remember-me" target="_blank" rel="noopener noreferrer">Feedback</a>
              </Item>
              <Item key="account" disabled>
                  <Avatar style={{ verticalAlign: 'middle' }} icon="user" src={img} /> US
              </Item>
          </Menu>
      );
  }
}

export default AppMenu;