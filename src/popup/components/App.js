import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, List } from 'antd';
const { Item } = List;
import Layout from './Layout.js';
import AddNew from './AddNew.js';
import s from '../styles/Switch.scss';
import { connect } from 'react-redux';

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

class App extends Component {
    getChildContext() {
        const state = this.props.store.getState();
        const {
            links,
            error,
            app : { activation, tab }
        } = state;
        return { links, error, activation, tab }
    }

    render() {
        const { links, tab = '' } = this.props
        return (
            <Layout>
                <List>
                    <Item>
                        <div className={s.container}>
                            <p>Smart filtering is off {links.length}</p>
                            <Switch defaultChecked onChange={onChange} />
                        </div>
                    </Item>
                    <Item>
                        <AddNew defaultValue={tab}/>
                    </Item>
                </List>
            </Layout>
        );
    }
}

App.childContextTypes = {
    links: PropTypes.array,
    error: PropTypes.object,
    activation: PropTypes.bool,
    tab: PropTypes.string
};

const mapStateToProps = state => {
    return {
        links: state.links,
        tab: state.app.tab
    }
}

export default connect(mapStateToProps)(App);