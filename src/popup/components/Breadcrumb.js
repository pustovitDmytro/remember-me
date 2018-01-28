import React from 'react';
import { Breadcrumb, Icon } from 'antd';
const { Item } = Breadcrumb;

export default ({ path }) => (
    <Breadcrumb>
        {
            path.map(({ link, icon, label }, i ) => (
                <Item href={link} key={i}>
                    <Icon type={icon}/>{label}
                </Item>))
        }
    </Breadcrumb>
);