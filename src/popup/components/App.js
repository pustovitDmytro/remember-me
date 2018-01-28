import React, { Component } from 'react';
import { Switch, Layout, Card } from 'antd';
const { Content } = Layout;
import Breadcrumb from './Breadcrumb.js';
import AddNew from './AddNew.js';
import Menu from './Menu.js';
import { List } from 'antd';
import s from '../styles/Switch.scss';
const { Item } = List;

function onChange(checked) {
    console.log(`switch to ${checked}`);
}
const path = [{
    icon: 'home',
    label: 'Home'
}, {
    label: 'User'
}]

class App extends Component {
    render() {
        return (
            <div>
                <Layout style={{ width: '450px' }}>
                    <Menu/>
                    <Content>
                        <Card title ={<Breadcrumb path={path}/>}>
                            <List>
                                <Item>
                                    <div className={s.container}>
                                        <p>Smart filtering is off. <br/>
                                        Enable it on this site</p>
                                        <Switch defaultChecked onChange={onChange} />
                                    </div>
                                </Item>
                                <Item>
                                    <AddNew defaultValue="link"/>
                                </Item>
                            </List>
                        </Card>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default App;