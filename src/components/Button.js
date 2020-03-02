import React from 'react';

import {  Menu, Dropdown } from 'antd';
import {Button as AntButton} from 'antd';
import { DownOutlined } from '@ant-design/icons';
const Button=({handleClick, menuItems, label})=>{
    const menu = (
        <Menu >
            {menuItems.map((name,index)=>(
                <Menu.Item key={index} onClick={()=>{handleClick(name)}}>{name}</Menu.Item>
                ))
            }
        </Menu>
    );
    return (<Dropdown overlay={menu}>
      <AntButton>
        {label} <DownOutlined />
      </AntButton>
    </Dropdown>)
}

export default Button;