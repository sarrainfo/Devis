// ============================================================
// Import packages
import React from 'react';
import { Table, Typography } from 'antd';
//import 'antd/dist/antd.css';

import { PRIECE_INT, PRIECE_EXT,DESIGNATION,QUANTITE, UNITE, UNITE_PRICE, TOTAL} from '../utils/constants';

const {Text, Title} = Typography;

//===========================================================================
// component
const Lot =({lignes,label,totalPriceInT,totalPriceExT })=>{
  
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
      title: PRIECE_EXT,
      dataIndex: 'priceExT',
    },
    {
      title: PRIECE_INT,
      dataIndex: 'priceInT',
    }];

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
              priceExT: ligne.priceExT,
              priceInT:ligne.priceInT, 
            })
    });

    // Add total Taxe Include
    data.push({
           key:lignes.length+1,
           designation: <Text type="danger">{TOTAL}</Text>,
           priceExT : <Text type="danger">{totalPriceExT}</Text>,
           priceInT:<Text type="danger">{totalPriceInT}</Text>,
      })


    return (
      <div style={{padding:'70px'}}>
        <Title level={4}>{label}</Title>
        <Table columns={columns} dataSource={data} size="medium" bordered pagination={false}
          />
      </div>
    )
}

export default Lot;

