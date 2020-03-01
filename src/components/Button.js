import React from 'react';

import { Typography, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Button=({onClick, menuItems, name})=>{
    const menu = (
        <Menu onClick={onClick}>
            {menuItems.map((item,index)=>(
                <Menu.Item key={index}>{item.name}</Menu.Item>
                ))
            }
        </Menu>
    );
    return (<Dropdown overlay={menu}>
      <Typography.Button>
        {name} <DownOutlined />
      </Typography.Button>
    </Dropdown>)
}

export default Button;