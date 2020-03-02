// ============================================================
// Import packages
import React from 'react';

import PaymentItem from './PaymentItem';

//============================================================

const PaymentItems = ({items, unite})=>(
    items.map(({label, montant, pourcentage})=>(
        <PaymentItem 
        key={montant} 
        label={label} 
        montant={montant} 
        pourcentage={pourcentage}
         unite={unite} 
         style={{textAlign: 'left'}}/>
    ))
);

//===========================================================
// export
export default PaymentItems;