//====================================================================================
// Import module

import {OTHER_SERVICE} from './constants';

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

/**{description, designation, priceExT, priceInT, quantite, unit_price,unite}
 * Get work by piece from lots 
 * @param {Array} lots 
 * @param {string} piece uuid 
 */
function getWorksByPieceFromLots(lots, uuid){
    const allLignes = getAllLignes(lots);
    let {lignesByPiece} = getWorksByPieceFromLignes(allLignes, uuid);
    // retrive no need information: locations
    lignesByPiece = lignesByPiece.map(({description, designation, priceExT, priceInT, quantite, unit_price,unite})=>(
         {
            description,
            designation,
            priceExT,
            priceInT,
            quantite,
            unit_price,
            unite
        })
    );
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
    totalPriceExT = Math.round(totalPriceExT);
    totalPriceInT = Math.round(totalPriceInT);
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
//==================================================================
// export 
export {
    getWorkByPiece,
    selectDataLots,
    selectDataLignes,
    selectDataLocations,
    getLabelLocation,
    getWorksByPieceFromLots,
    getAllLignes,
    getTotalPriceOnLignes,
    getWorksByPieceFromLignes,

}