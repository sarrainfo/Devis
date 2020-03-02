// ============================================================
// Import packages
import React from 'react';


import {Header, Lot} from './scene';
import {Button} from './components';
import {URL_DEVIS, FILTER_ITEMS, MENU, BY_PIECE, BY_WORKS, OTHER_SERVICE} from './utils/constants';

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
//=====================================================================================
// Helpers

/**
 * Get lots by piece
 * @param {Array} locations 
 * @param {Array} lotsByWorks 
 * @returns {object}
 */
function getWorkByPiece(locations, lotsByWorks){
    const lotsByPiece = locations.map(({ uuid }) => getWorksByPieceFromLots(lotsByWorks, uuid));
    return lotsByPiece.map((lot)=>({
            ...lot,
            label: getLabelLocation(locations, lot.uuid),

        }));
    
}
/**
 * Select all data we need from data response request
 * @param {object} data 
 * @returns {object}
 */
function selectDataLots(data){
    return data.lots.map(({label, prixTotalTTC, lignes, prixTotalHT})=>({
        label,
        totalPriceInT:prixTotalTTC,
        totalPriceExT:prixTotalHT,
        lignes: selectDataLignes(lignes),
        
    }));
}
/**
 * Select all data we need from lignes 
 * @param {Array} lignes 
 * @returns {Array}
 */
function selectDataLignes(lignes){
    return lignes.map(({
        designation, description, prixUnitaireHT,unite,quantite,prixHT,prixTTC,locationsDetails
    })=>(
       {
        locations: locationsDetails.locations.map(location => location.uuid),
        designation,
        description,
        unit_price:prixUnitaireHT,
        quantite,
        unite,
        priceExT: prixHT,
        priceInT:prixTTC,
    }));
}

/**
 * Retrieve data that we use from the data response
 * @param {Object} data 
 */ 
function selectDataLocations(data){
    return data.locations.map(({label, uuid})=>({
        label,
        uuid,
    }))
}

/** Depreciate
 * Get locations by piece
 * @param {Array} locations 
 * @param {Array} lots 
 */
function getByPiece(locations,lots){
    console.log(lots, locations)
    return lots.reduce((acc, curr)=>{
       curr.lignes.map(ligne=>{
           ligne.locations.forEach(uuid=>{
                acc.forEach(value=> {
                    value.uuid===uuid && value.lignes.push(ligne);
                    });
                });
             acc.totalPriceTTC= acc.totalPriceTTC+ ligne.priceTTC;
             console.log('acc',isNaN(acc.totalPriceTTC));
                
            });
            return acc
        },locations)
         
}

/**
 * Get label from location uuid
 * @param {Array} locations 
 * @param {string} uuid 
 * @returns {string}
 */
function getLabelLocation(locations,uuid){
    const location = locations.find(location=> location.uuid===uuid) 
    return location ? location.label : OTHER_SERVICE;
}

/**
 * Get work by piece from lots 
 * @param {Array} lots 
 * @param {string} piece uuid 
 */
function getWorksByPieceFromLots(lots, uuid){
    const allLignes = getAllLignes(lots);
    const {lignesByPiece} = getWorksByPieceFromLignes(allLignes, uuid);
    const {totalPriceInT, totalPriceExT} = getTotalPriceOnLignes(lignesByPiece);
    return {
            uuid,
            totalPriceInT,
            totalPriceExT,
            lignes : lignesByPiece,
            }
}

/**
 * Concat all lignes on lots
 * @param {Array} lots 
 */
function getAllLignes(lots){
    let allLignes =[];
    lots.forEach(lot=>allLignes= allLignes.concat(lot.lignes));
    return allLignes;
}

/**
 * Calcule the total price on lignes
 * @param {Array} lignes 
 */
function getTotalPriceOnLignes(lignes){
    let totalPriceInT=0;
    let totalPriceExT= 0
    lignes.forEach(ligne=>{
        totalPriceInT+= ligne.priceInT;
        totalPriceExT+= ligne.priceExT;
        
    })
    return {
        totalPriceInT,
        totalPriceExT,
        
    }
}

/**
 * Get work for one piece
 * @param {Array} lignes 
 * @param {String} uuid 
 */
function getWorksByPieceFromLignes(lignes, uuid){
    let lignesByPiece = uuid 
    ? 
    lignes.filter(ligne=>(
        ligne.locations.find(locationUuid => locationUuid===uuid)))
    :
    lignes.filter(ligne=>(
        ligne.locations.length<=0
    ))
    return {
        uuid,
        lignesByPiece
    }
}

//=========================
// export
export default Devis;