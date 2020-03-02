// ============================================================
// Import packages
import React from 'react'
import { Typography } from 'antd';

const {Text } = Typography;
const PaymentItem = ( { label, montant, pourcentage, unite, style})=>{
        
    const condition = `${label} de ${pourcentage}%:`;
        return (
            <div style={style} >
                {condition}
                <Text strong>{montant}{unite}</Text>
                <br/>
            </div>
        )
        
}


export default PaymentItem;