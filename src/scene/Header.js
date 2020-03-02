// ============================================================
// Import packages
import React from 'react';
import { Row, Col, Typography } from 'antd';
import 'antd/dist/antd.css';

// ============================================================
// Import components
import {Address,Logo} from '../components';

const {Text, Title} = Typography;

// Component
const Header = ({company,devisTitle,chantier, customer,date, billingAddress})=>{
    console.log('ss', company);
    const representantLegal = 
            `Representant legal:${company.firstNameRepresentantLegal} ${company.lastNameRepresentantLegal}`;
    const toClient = `A ${customer.name}`;
    const displayDate = `le ${date}`;
    return (<>
    <Row>
        <Col span={2} offset={3}>
            <Logo url={company.logoUrl}/>
        </Col>
        <Col span={3}>
            <Address 
                street={company.address} 
                postalCode={company.postalCode} 
                city={company.city}/>
        </Col>     
    </Row>
    <Row>
    <Col span={2} offset={3}>
        <Title level={2}>{company.name}</Title>
    </Col>
    </Row>
    <Row>
        <Col span={4} offset={3}>
            <Text strong>{representantLegal}</Text>
        </Col>
    </Row>
    <Row>
    <Col span={3} offset={14}>
        <Text>{toClient}</Text>
        <Address street={billingAddress.address} postalCode={billingAddress.postalCode} city={billingAddress.city}/>
    </Col>
    </Row>
    <Row>
        <Col span={3} offset={3}>
        <Address street={chantier.address} postalCode={chantier.postalCode} city={chantier.city}/>
        </Col>
        
    </Row>
    <Row>
        <Col span={3} offset={14}>
            <Text strong>{displayDate}</Text>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        <Title level={3}>{devisTitle}</Title>
        </Col>
    </Row>
</>)
}


// ============================================================
// export

export default Header;