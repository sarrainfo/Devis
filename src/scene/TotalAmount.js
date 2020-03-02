// ============================================================
// Import packages
import React from 'react';
import {Card, Typography } from 'antd';

const {Text} = Typography;
//==========================================================
// Component

const TotalAmount =({totalPriceExT, totalPriceInT, unite})=>(
    <Card style={{ width: 600 }}>
        <p><Text strong>{`TOTAL HT: ${totalPriceExT} ${unite}`}</Text></p>
        <p><Text strong>{`TOTAL TTC: ${totalPriceInT} ${unite}`}</Text></p>
    </Card>
)

//==============================================================
// export
export default TotalAmount