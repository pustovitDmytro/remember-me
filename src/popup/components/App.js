import React from 'react';
import { Component } from 'react';
// import Input from './Input.js';
import { Input } from 'antd';
import { Icon } from 'antd';
import { Switch } from 'antd';
import { Card } from 'antd';

import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import { Breadcrumb } from 'antd';
class A extends React.Component {
  state = {
      current: 'mail',
  }

  handleClick = e => {
      this.setState({
          current: e.key,
      });
  }

  render() {
      return (
          <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
          >
              <Menu.Item key="home">
                  <Icon type="home" />Home
              </Menu.Item>
              <Menu.Item key="browse" disabled>
                  <Icon type="cloud-o" />Browse Lists
              </Menu.Item>
              <SubMenu title={<span><Icon type="setting" />Settings</span>}>
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4">Option 4</Menu.Item>
              </SubMenu>
              <Menu.Item key="feedback">
                  <a href="https://github.com/pustovitDmytro/remember-me" target="_blank" rel="noopener noreferrer">Feedback</a>
              </Menu.Item>
          </Menu>
      );
  }
}

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

class App extends Component {
    render() {
        return (
            <div>
                <A/>
                <Card title={<Breadcrumb>
                    <Breadcrumb.Item href="">
                        <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                        <Icon type="user" />
                        <span>User</span>
                    </Breadcrumb.Item>
                </Breadcrumb>} extra={
                    <Switch defaultChecked onChange={onChange} />} style={{ width: 500 }}>
                    <Input addonAfter={<Icon type="plus-circle-o" />} defaultValue="text"/>
                </Card>
            </div>
        );
    }
}

export default App;