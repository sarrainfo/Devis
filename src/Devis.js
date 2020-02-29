import React from 'react';
import {Header, Information} from './scene';

class Devis extends React.Component{
    constructor(){
        super();
        this.state = {
            isLoading:true,
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
    }
}

