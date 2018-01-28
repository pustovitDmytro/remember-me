import React from 'react';
import { Input, Button } from 'antd';
import s from '../styles/AddNew.scss';

export default ({ defaultValue }) => (
    <div className={s.container}>
        <Input defaultValue={defaultValue}/>
        <Button type="primary" icon="plus-circle-o" />
    </div>
);