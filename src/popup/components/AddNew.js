import React, { Component } from 'react';
import { Input, Button } from 'antd';
import s from '../styles/AddNew.scss';
import { connect } from 'react-redux';
import { addLink } from '../actions/lists';

class AddNew extends Component {
    state = {
        text: this.props.defaultValue
    };

    handleChange = event => {
        this.setState({
            text: event.target.value
        });
    }

    handleAdd = () => {
        const value = this.state.text;
        const { dispatch } = this.props;
        dispatch(addLink(value));
    }

    render() {
        const { defaultValue } = this.props;
        return (
            <div className={s.container}>
                <Input defaultValue={defaultValue} onChange={this.handleChange} onPressEnter={this.handleAdd}/>
                <Button type="primary" icon="plus-circle-o" onClick={this.handleAdd} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        links: state.links
    }
}

export default connect(mapStateToProps)(AddNew);