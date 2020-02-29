// ============================================================
// Import packages
import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';


// ============================================================
// Components
const Text = ({children, strong})=>{
    return (<Typography.Text strong={strong}>{children}</Typography.Text>)
};


Text.propTypes = {
    children  : PropTypes.node.isRequired,
    
};

// ============================================================
// Exports
export {Text};