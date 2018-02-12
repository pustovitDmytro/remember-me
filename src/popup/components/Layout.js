import React from 'react';
import { Layout, Card } from 'antd';
const { Content } = Layout;
import Breadcrumb from './Breadcrumb.js';
import Menu from './Menu.js';

const path = [{
    icon: 'home',
    label: 'Home'
}, {
    label: 'User'
}];

export default props => (
    <Layout style={{ width: '450px' }}>
        <Menu/>
        <Content>
            <Card title ={<Breadcrumb path={path}/>}>
                {
                    props.children
                }
            </Card>
        </Content>
    </Layout>
);