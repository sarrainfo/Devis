// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

// ============================================================
// Components
const  Logo=({url})=>{
return  <Avatar shape="square" size={64} src={url} />
}

Logo.propTypes = {
    url : PropTypes.string.isRequired,
    
};

export default Logo
