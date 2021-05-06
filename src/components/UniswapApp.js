/*
import React, {Component} from 'react'
import './App.css'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import uniswaplogo from '../images/logo.png'
import daiLogo from '../dai-logo.png'
import Navbar from './Navbar'
import {ChainId, Fetcher,WETH} from '@uniswap/sdk';

*/


const  React = require('react');
const ReactDOM =require('react-dom');
const {Component} = require('react');
const Style  =require('./App.css');
const {ApolloClient}  = require('apollo-client');
const  {InMemoryCache} = require ('apollo-cache-inmemory');
const {HttpLink} = require ('apollo-link-http');
const  {useQuery} =require('@apollo/react-hooks')
const  gql  = require('graphql-tag');
const uniswaplogo  =require ('../images/logo.png');
const daiLogo  =require('../dai-logo.png');
const Navbar = require('./Navbar');
const {ChainId, Fetcher,WETH, Route, Trade, TokenAmount, TradeType} =require ('@uniswap/sdk');


//We set our mainnet we would be working on 


//We would also set the token address, sort of the token url
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

const init = async()=> {
 // We fetch the dai token with its address 
const dai = await Fetcher.fetchTokenData(chainId, tokenAddress);

// We get the eth tokens, this is called from the uniswap sdk like this
const weth = WETH[chainId];

// Now we pair the two tokens with the by fetching them together
const pair = await Fetcher.fetchPairData(dai, weth);
const route = new Route([pair], weth);
const trade = new Trade(route, new TokenAmount(weth, '100000000000000000', TradeType.EXACT_INPUT));
console.log(route.midPrice.toSignificant(6));
console.log(route.midPrice.toSignificant(6));
console.log(trade.executionPrice.toSignificant(6));

const slippageTolerance = new Percent('50', '10000');
const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
const path = [weth.address, dai.address];

 const to = '';
 const deadline = Math.floor(Date.now()/1000) + 60* 20;
 const provider = ethers.getDefaultProvider('ropsten', {infura: 'https://ropsten.infura.io/v3/de92f2791cfa4b2bb36aa86ae5b78137'});

const signer = new ethers.Wallet(PRIVATE_KEY);
const accounts = signer.connect(provider);
const uniswap  = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns(uint[] memory amounts)'], account);

const tx = await uniswap.sendExactETHForTokens(amountOutMin, path, to, deadline, {value, gasPrice:20e9})

console.log(`Transaction hash:' ${tx.hash}`);

const receipt = await tx.await();
console.log(`Transaction was mined in block ${receipt.blockNumber}`);
}



init();

// Uniswap sdk 




// This NFT CAN QUERY 
/*
    const client = new ApolloClient({
        link: new HttpLink({
         uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'


        }),
        fetchOptions:{
            mode:'no-cors'
        },
        cache: new InMemoryCache()
    })


const DAI_QUERY = gql`
query tokens($tokenAddress: Bytes!){
 tokens(where: {id: $tokenAddress }){
     derivedETH
     totalLiquidity
 }

}`


const ETH_PRICE_QUERY = gql`
 query bundles {
 bundles(where: {id: "1"})
 ethPrice
 {}

 }`

//proce


const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice





    
const {loading:ethLoading, data: ethPriceData} = useQuery(ETH_PRICE_QUERY)
const {loading: daiLoading, data:daiData} = useQuery(DAI_QUERY, {
    variables:{
        tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f'
    }
})

   const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
   const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
   const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice
*/


  class UniswapApp extends React.Component {
   constructor(props) {
      super(props);
		
      this.state = {
         header: "Header from state...",
         content: "Content from state..."
      }
   }
   render() {
      return (
         <div>
            <h1>{this.state.header}</h1>
            <h2>{this.state.content}</h2>
         </div>
      );
   }
}
export default UniswapApp;