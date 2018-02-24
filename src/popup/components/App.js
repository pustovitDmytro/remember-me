import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, List } from 'antd';
const { Item } = List;
import Layout from './Layout.js';
import AddNew from './AddNew.js';
import s from '../styles/Switch.scss';
import { connect } from 'react-redux';
import router from '../router.js';

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

class App extends Component {
    getChildContext() {
        const state = this.props.store.getState();
        const {
            links,
            error,
            app : { activation, tab, location }
        } = state;
        return { links, error, activation, tab, location }
    }

    render() {
        const { links, tab = '', location } = this.props
        console.log("location", location);
        // const component = await router.resolve({ pathname: '/home' }).then(res => {
        //     console.log(res);
        //     return <AddNew/>;
        // });
        // console.log("component", component);
        return (
            <Layout>
                { location }
                <AddNew/>
            </Layout>
        );
    }
}

App.childContextTypes = {
    links: PropTypes.array,
    error: PropTypes.object,
    activation: PropTypes.bool,
    tab: PropTypes.string,
    location: PropTypes.function
};

const mapStateToProps = state => {
    return {
        links: state.links,
        tab: state.app.tab,
        location: state.app.location
    }
}

export default connect(mapStateToProps)(App);