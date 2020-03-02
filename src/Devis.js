// ============================================================
// Import packages
import React from 'react';
import { Row, Col, Typography, Card } from 'antd';


import {Header, Lot, PaymentCondition} from './scene';
import {Button} from './components';
import {
    URL_DEVIS, FILTER_ITEMS, MENU, BY_PIECE, BY_WORKS, OTHER_SERVICE,
    selectDataLocations, selectDataLots, getWorkByPiece,
   // getPaymentConditionText
    } from './utils';

const {Text} = Typography
//===========================================================
// Component
class Devis extends React.Component{
    constructor(){
        super();
        this.state = {
            isLoading:true,
            filter:BY_WORKS,
        }
        this.updateDataToState = this.updateDataToState.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateTable = this.updateTable.bind(this);
        this.getPaymentCondition = this.getPaymentCondition.bind(this);
    }
    handleClick(name){
        this.setState({filter:name});

    }
    // Change table if change the filter
    updateTable(){
        
        if(this.state.filter===BY_WORKS){
            return this.state.lotsByWorks.map(({lignes,label,totalPriceInT, totalPriceExT})=>(
                <Lot key={label} lignes={lignes} label={label} totalPriceInT={totalPriceInT} totalPriceExT={totalPriceExT}/>)) 
        }
        if( this.state.filter=== BY_PIECE){
            return this.state.lotsByPiece.map(({lignes, totalPriceInT, label, totalPriceExT})=>(
                <Lot key={label} lignes={lignes} label={label} totalPriceInT={totalPriceInT} totalPriceExT={totalPriceExT} />
            ))
        }
       
    }
    
    // 
    updateDataToState(data){

        // Get need information data from json request
        // customer information
        const {customerName, customerEmail}= data.deal;
        const customer = {
            name:customerName,
            email: customerEmail,
        };

        //
        let {address, postalCode, city}= data.deal.chantierAddress;
        const chantier={
            address,
            postalCode,
            city
        };

        // company information
        const company ={
          address: data.company.address,
          postalCode: data.company.postalCode,
          city: data.company.city,
          firstNameRepresentantLegal: data.company.firstNameRepresentantLegal,
          lastNameRepresentantLegal: data.company.lastNameRepresentantLegal,
          logoUrl : data.company.logoUrl,
          name: data.company.name,
        };

        //billing information
        const billingAddress={
            address: data.deal.billingAddress.address,
            postalCode: data.deal.billingAddress.postalCode,
            city: data.deal.billingAddress.city
        };
       // const locations = selectDataLocations(data).push({label:OTHER_SERVICE, uuid:null});
        let locations = selectDataLocations(data);
        locations.push({label:OTHER_SERVICE, uuid:null});
        const lotsByWorks = selectDataLots(data);
        const  lotsByPiece = getWorkByPiece(locations, lotsByWorks);

        // data about payment condition
        const payment = data.modalitesPaiement;
        const {prixTotalTTC:totalPriceInT, prixTotalHT:totalPriceExT} = data;
        
        // Initialize the state
        this.setState({ 
            isLoading: false,
            company: company,
            billingAddress: billingAddress,
            
            devisTitle : data.title,
            chantier : chantier,
            customer: customer,
            date: data.date,
            lotsByWorks,
            lotsByPiece,
            payment,
            totalPriceInT,
            totalPriceExT,
            
        })
    
    }
    getPaymentCondition(){
        return this.state.payment.map(({label, montant, pourcentage})=>{
            const condition = `${label} de ${pourcentage}%:`;
            return (
            <div style={{textAlign: 'left'}} key={montant}>
                {condition}
                <Text strong>{montant}</Text>
                <br/>
            </div>
            )
        });
    }
    async componentDidMount(){
        
        this.setState({isLoading: true});
        const reponse = await fetch(URL_DEVIS);
        const data = await reponse.json();
        this.updateDataToState(data);
        
    }
    render(){
        if( this.state.isLoading){
            return <div>onLoading ...</div>
        }

        return (
            <>
                <Header 
                    company={this.state.company}
                    devisTitle={this.state.devisTitle} 
                    chantier={this.state.chantier}
                    customer={this.state.customer}
                    date={this.state.date}
                    billingAddress={this.state.billingAddress}/>
                    <Button menuItems={FILTER_ITEMS} label={MENU} handleClick={this.handleClick}/>
                {this.updateTable()}
                <Row>
                    <Col span={12} offset={3}>
                        <PaymentCondition>
                            {this.getPaymentCondition()}
                        </PaymentCondition>
                        </Col>
                        <Col offset={15}>
                        <Card style={{ width: 600 }}>
                            <p><Text strong>{`TOTAL HT: ${this.state.totalPriceExT}`}</Text></p>
                            <p><Text strong>{`TOTAL TTC: ${this.state.totalPriceInT}`}</Text></p>
                        </Card>
                    </Col>
                            
        
                </Row>
               
            </>
            )
        }
}


//=========================
// export
export default Devis;