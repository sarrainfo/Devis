// ============================================================
// Import packages
import React from 'react'
import {PAYMENT_CONDITION_TITLE} from '../utils';

const PaymentCondition = ( {children})=>(
        <>
            <div style={{color:'blue', textDecoration:'underline'}}>{PAYMENT_CONDITION_TITLE}</div>
            {children}
        </>
    )


export default PaymentCondition;