import React from 'react';
import { Component } from 'react';
// import Input from './Input.js';
import { Input } from 'antd';
import { Icon } from 'antd';
import { Switch } from 'antd';
import 'antd/dist/antd.css';

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    {
                        "ssssssssssssssssssss"
                    }
                </div>
                <Input addonAfter={<Icon type="setting" />} defaultValue="text"/>
                <Icon type="setting" />
                <Icon type="question" style={{ fontSize: 16, color: '#08c' }} />
                <div>dsdsdls;ld;sd;</div>
                <Icon type="caret-up" />
                <Switch defaultChecked onChange={onChange} />
            </div>
        );
    }
}

export default App;