import React, { Component } from 'react';
import { Switch, List } from 'antd';
const { Item } = List;
import AddNew from '../components/AddNew.js';
import s from '../styles/Switch.scss';
import { connect } from 'react-redux';

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

class App extends Component {
    render() {
        const { links, tab = '' } = this.props
        return (
            <List>
                <Item>
                    <div className={s.container}>
                        <p>BRWOWOWOWOWOWO {links.length}</p>
                        <Switch defaultChecked onChange={onChange} />
                    </div>
                </Item>
                <Item>
                    <AddNew defaultValue={tab}/>
                </Item>
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