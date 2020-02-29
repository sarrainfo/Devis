import React from 'react';

import { Table } from 'antd';
import {ALL, AMOUNT, DESIGNATION,QUANTITE, UNITE, UNITE_PRICE} from '../utils/constants';
const Information =({lots})=>{

    // const columns = [
    //     {
    //         title: DESIGNATION,
    //         dataIndex: DESIGNATION,
    //     },
    //     {
    //         title: UNITE,
    //         dataIndex: UNITE,
    //     },
    //     {
    //         title: QUANTITE,
    //         dataIndex: QUANTITE,
    //     },
    //     {
    //         title: UNITE_PRICE,
    //         dataIndex: UNITE_PRICE,
    //     },
    //   ];
    const columns = ALL.map(value=>({
        title: value,
        dataIndex : value,
    }));
      const data = lots.map((lot,i) => ({
        key:i,
        designation:lot.designation,
        unite: lot.unite, 
        quantite:lot.quantite, 
        unit_price:lot.unit_price,
        amount:lot.amount 
    }));

    return (
        <Table columns={columns} dataSource={data} size="middle" />
    )
}


export default Information;
