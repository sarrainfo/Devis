// ============================================================
// Import packages
import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';

// ============================================================
// Components
const Title = ({title, level})=>{
    return(<Typography.Title level={level}>{title}</Typography.Title>)
}


Title.defaultProps = {
    title  : '',
    level : 1
};

Title.propTypes = {
    title : PropTypes.string,
    level : PropTypes.number,
    
};

// ============================================================
// Exports
export default Title