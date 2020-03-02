// ============================================================
// Import packages
import React from 'react';


import {Header, Lot} from './scene';
import {Button} from './components';
import {
    URL_DEVIS, FILTER_ITEMS, MENU, BY_PIECE, BY_WORKS, OTHER_SERVICE,
    selectDataLocations, selectDataLots, getWorkByPiece
    } from './utils';

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
        const {customerName, customerEmail}= data.deal;
        const customer = {
            name:customerName,
            email: customerEmail,
        };
        let {address, postalCode, city}= data.deal.chantierAddress;
        const chantier={
            address,
            postalCode,
            city
        };
        const company ={
          address: data.company.address,
          postalCode: data.company.postalCode,
          city: data.company.city,
          firstNameRepresentantLegal: data.company.firstNameRepresentantLegal,
          lastNameRepresentantLegal: data.company.lastNameRepresentantLegal,
          logoUrl : data.company.logoUrl,
        };
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
            
        })
    
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
       
        // Change table if change the filter
        // const lots = this.state.filter===BY_WORKS ?
        //     this.state.lotsByWorks.map(({lignes,label,totalPriceTTC})=>(
        //         <Lot key={label} lignes={lignes} label={label} totalPriceTTC={totalPriceTTC}/>)) :
        //     this.state.lotsByPiece.map(({lignes,label, totalPriceTTC})=>(
        //         <Lot key={label} lignes={lignes} label={label} totalPriceTTC={totalPriceTTC} />))
        //     ;
        
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
            </>
            )
        }
}

//=========================
// export
export default Devis;