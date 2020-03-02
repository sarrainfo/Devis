// ============================================================
// Import packages
import React from 'react';
import { Avatar } from 'antd';

// ============================================================
// Components
const  Logo=({url})=>{
return  <Avatar shape="square" size={64} src={url} />
}

export default Logo
