// ============================================================
// Import packages
import React from 'react';


import {Header, Lot} from './scene';
import {Button} from './components';
import {URL_DEVIS} from './utils/constants';

class Devis extends React.Component{
    constructor(){
        super();
        this.state = {
            isLoading:true,
        }
        this.updateDataToState = this.updateDataToState.bind(this);
    }
    
    updateDataToState(data){
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
        const lots = data.lots.map(({label, prixTotalTTC, lignes})=>({
            label,
            totalPriceTTC:prixTotalTTC,
            lignes: getLignes(lignes),
            
        }));
        const locations = getLocations(data);
        
        this.setState({ 
            isLoading: false,
            company: company,
            billingAddress: billingAddress,
            
            devisTitle : data.title,
            chantier : chantier,
            customer: customer,
            date: data.date,
            lots,
            locations
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
            return <div>onLoading</div>
        }
        console.log('ss', this.state.locations)
        getxx(this.state.locations, this.state.lots);
        const lots = this.state.lots.map(({lignes,label,totalPriceTTC})=>(
            <Lot key={label} lignes={lignes} label={label} totalPriceTTC={totalPriceTTC}/>));
        const menu= ['par piece', 'par travaux'];
        return (
            <>
                <Header 
                    company={this.state.company}
                    devisTitle={this.state.devisTitle} 
                    chantier={this.state.chantier}
                    customer={this.state.customer}
                    date={this.state.date}
                    billingAddress={this.state.billingAddress}/>
                    <Button menuItems={menu} name='filtrer'/>
               {lots}
            </>
                )
        }
}
//=====================================================================================
// Helpers

/**
 * Get all need informations 
 * @param {Array} lots 
 */
function getLignes(lignes){
    return lignes.map(({designation, description, prixUnitaireHT,unite, quantite,prixHT,tauxTVA,montantTVA,prixTTC, locationsDetails})=>(
       {
        locations: locationsDetails.locations.map(location => location.uuid),
        designation,
        description,
        unit_price:prixUnitaireHT,
        quantite,
        unite,
        prixHT,
        tauxTVA,
        amountTVA:montantTVA,
        priceTTC:prixTTC,
    }));
}

// get Locations information 
function getLocations(data){
    return data.locations.map(({label, uuid})=>({
        label,
        uuid,
        lignes:[], 
    }))
}

function getxx(locations,lots){
    return lots.reduce((acc, curr)=>{
       curr.lignes.map(ligne=>
           ligne.locations.forEach(uuid=> {
                acc.forEach(value=> {
                    value.uuid===uuid && value.lignes.push(uuid);
                    });
                }));
            return acc
        },locations)
       
    
}

export default Devis;