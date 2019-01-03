import React, { Component } from 'react';
import { Switch, List } from 'antd';
const { Item } = List;
import AddNew from '../components/AddNew.js';
import s from '../styles/Switch.scss';
import { connect } from 'react-redux';
import { Upload, message, Button, Icon } from 'antd';

const props = {
    name: 'file',
    action: (...args) => console.log(...args),
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

class App extends Component {
    render() {
        const { links, tab = '' } = this.props
        return (
            <List>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
            </List>
        );
    }
}


const mapStateToProps = state => {
    return {
        links: state.links,
        tab: state.app.tab
    }
}

export default connect(mapStateToProps)(App);