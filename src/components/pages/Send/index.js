const React =require( 'react');
const ExchangePage =require('../../components/ExchangePage');


//import React from 'react'
//import ExchangePage from '../../components/ExchangePage'

export default function Send({ initialCurrency, params }) {
  return <ExchangePage initialCurrency={initialCurrency} params={params} sending={true} />
}
