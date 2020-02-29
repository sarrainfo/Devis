import React from 'react';
import { Descriptions } from 'antd';
import { Row, Col,Typography } from 'antd';
import 'antd/dist/antd.css';

import {Address,Logo, Text, Title} from '../components';

class Header extends React.Component{

    constructor(){
        super();
        this.state = {
            isLoading:true,
            //title :'',
            //company: {},
            //chantierAddress:{}
        }
        this.updateDataToState = this.updateDataToState.bind(this);
    }
    // async await pareil que fetch.then
    // componentWillMount(){
    //  fetch("https://api.travauxlib.com/api/devis-pro/JKusHl8Ba8MABIjdCtLZOe2lxxnUfX")
    // .then(response=>response.json())
    // .then(data=>this.setState({
    //     jsonDevis: data,
    //     company: data.company,
    //     title : data.title,
    //     chantierAddress : data.deal.chantierAddress
    // }
        
    //     ));
    updateDataToState(data){
        const {customerName, customerEmail} = data.deal;
        const {address: customerAddress, postalCode: customerPostalCode, city: customerCity}= data.deal.billingAddress;
        this.setState({ 
            isLoading: false,
            company: data.company,
            title : data.title,
            chantierAddress : data.deal.chantierAddress,
            customer:{
                name: customerName,
                email: customerEmail,
                address: customerAddress,
                postalCode: customerPostalCode,
                city: customerCity,
            },
            date: data.date,
        })
    
    }
    async componentWillMount(){
        
        this.setState({isLoading: true});
        const reponse = await fetch("https://api.travauxlib.com/api/devis-pro/JKusHl8Ba8MABIjdCtLZOe2lxxnUfX");
        const data = await reponse.json();
        this.updateDataToState(data);
        
    }


    render(){
        if( this.state.isLoading){
            return <div>onLoading</div>
        }
        const {
            name: companyName,
            email: companyEmail,
            address: companyAddress,
            city: companyCity,
            postalCode: companyPostalCode,
            firstNameRepresentantLegal, 
            lastNameRepresentantLegal
        }= this.state.company;
        const title= this.state.title;
        const {
            address:chantierAddress,
            postalCode:chantierPostalCode,
            city:chantierCity
        }=this.state.chantierAddress;
       
        const representantLegal = 
            `Legale representant:${firstNameRepresentantLegal} ${lastNameRepresentantLegal}`;
        const toClient = `A l ${this.state.customer.name}`;
        const displayDate = `on ${this.state.date}`;
       
        return(
            <>
            <Row>
                <Col span={2} offset={3}>
                    <Logo url={this.state.company.logoUrl}/>
                </Col>
                <Col span={3}>
                    <Address 
                        street={companyAddress} 
                        postalCode={companyPostalCode} 
                        city={companyCity}/>
                </Col>
                
            </Row>
            <Row>
            <Col span={2} offset={3}>
                <Title level={2} title={companyName}/>
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
                <Address street={this.state.customer.address} postalCode={this.state.customer.postalCode} city={this.state.customer.city}/>
            </Col>
            </Row>
            <Row>
                <Col span={3} offset={3}>
                <Address street={chantierAddress} postalCode={chantierPostalCode} city={chantierCity}/>
                </Col>
                
            </Row>
            <Row>
                <Col span={3} offset={14}>
                    <Text strong>{displayDate}</Text>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <Title title={title} level={3}/>
                </Col>
            </Row>
        </>
        
        );
       
    }
}


// render(){
//     console.log('ssss', this.state.jsonDevis.title)
//     return(<Logo url={this.state.jsonDevis.company.logoUrl}/>);
// }

export default Header;