// ============================================================
// Import packages
import React from 'react';
import { Row, Col} from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

// ============================================================
// Components
const Address = ({street, postalCode, city})=>{
    //const completeAdress = <><Row><Col span={8}>street</Col></Row><Row> <Col span={8}>postalCode</Col></Row></>
    return (
        
        <>
        <Row>
            <Col span={24}>{street}</Col>
        </Row>
        <Row>
            <Col span={24}>{postalCode}</Col>
        <Row>
            <Col span={24}>{city}</Col>
        </Row>
   
        </Row></>
    
    )
}

Address.propTypes = {
    street : PropTypes.string.isRequired,
    postalCode : PropTypes.string.isRequired,
    city : PropTypes.string.isRequired,
    
};

export default Address;