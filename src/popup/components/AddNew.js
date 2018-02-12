import React, { Component } from 'react';
import { Input, Button } from 'antd';
import s from '../styles/AddNew.scss';
import { connect } from 'react-redux';
import { addLink } from '../api';

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
        console.log("this.state", this.state);
        console.log("value", value);
        const { dispatch } = this.props;
        dispatch(addLink(value)).then(p => {
            console.log("p", p);
        }).catch(err => {
            console.log("err", err);
        })
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

export default connect()(AddNew);