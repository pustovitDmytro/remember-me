import React, { Component } from 'react';
import { Switch, List } from 'antd';
const { Item } = List;
import Layout from './Layout.js';
import AddNew from './AddNew.js';
import s from '../styles/Switch.scss';

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

class App extends Component {
    render() {
        return (
            <Layout>
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
            </Layout>
        );
    }
}

export default App;