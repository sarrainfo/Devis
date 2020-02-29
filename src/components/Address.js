import React from 'react';
import { Row, Col,Descriptions } from 'antd';
import 'antd/dist/antd.css';

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

export default Address;