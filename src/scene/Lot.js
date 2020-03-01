// ============================================================
// Import packages
import React from 'react';
import { Table } from 'antd';
//import 'antd/dist/antd.css';

import { TTC_AMOUNT, DESIGNATION,QUANTITE, UNITE, UNITE_PRICE, TOTAL} from '../utils/constants';
import {Title, Text} from '../components';
const Lot =({lignes,label,totalPriceTTC })=>{

    //
    const columns = [
        {
            title: DESIGNATION,
            dataIndex: 'designation',
        },
        {
            title: UNITE,
            dataIndex: 'unite',
        },
        {
            title: QUANTITE,
            dataIndex: 'quantite',
        },
        {
            title: UNITE_PRICE,
            dataIndex: 'unit_price',
        },
        {
          title: TTC_AMOUNT,
          dataIndex: 'amount',
        }
      ];

        // Data table
      const data = lignes.map((ligne,i) => {
      
        const designation = 
        <div>
          <Text underline>{ligne.designation}</Text>
          <br/>{ligne.description}
        </div>;
          return({
            key:i+1,
            designation:designation,
            unite: ligne.unite, 
            quantite:ligne.quantite, 
            unit_price:ligne.unit_price,
            amount:ligne.priceTTC, 
          })});

          // Add total TTC
         data.push({
           key:lignes.length+1,
           designation: <Text type="danger">{TOTAL}</Text>,
           amount:<Text type="danger">{totalPriceTTC}</Text>,
         })


    return (
      <div style={{padding:'70px'}}>
        <Title level={4} title={label}/>
        <Table columns={columns} dataSource={data} size="medium" bordered pagination={false}
          />
      </div>
    )
}

export default Lot;

