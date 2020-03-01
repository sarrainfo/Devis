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
// const BlockItem = ({ width, gridColumn, height, rowColumn, left, top, ...props }) => {
//     const parsedGridColumn = width ? `${left} / ${width}` : gridColumn;
//     const parsedGridRow = height ? `${top} / ${height}` : rowColumn;
//     return <StyledBlockItem gridColumn={parsedGridColumn} gridRow={parsedGridRow} {...props} />;
// };