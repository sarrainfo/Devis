// ============================================================
// Import packages
import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';


// ============================================================
// Components
const Text = ({children, strong, underline, type })=>{
    return (<Typography.Text strong={strong}  underline={underline} type={type}>{children}</Typography.Text>)
};


Text.propTypes = {
    children  : PropTypes.node.isRequired,
    
};

// ============================================================
// Exports
export {Text};