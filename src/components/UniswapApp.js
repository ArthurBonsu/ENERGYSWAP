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


//We set our mainnet we would be working on 
const {ChainId, Fetcher,WETH} = require('@uniswap/sdk');

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
console.log(route.midPrice.toSignificant(6));
console.log(route.midPrice.toSignificant(6));
}

init();

// Uniswap sdk 




// This NFT CAN QUERY 

    export const client = new ApolloClient({
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




const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice



class UniswapApp extends Component  {
    constructor(props){
       super (props)
        this.state = {
          tokenid:0,
          daiprice:0,
          totalliquidity:0,
          ethPriceInUSD: 0  

        }

    }
const {loading:ethLoading, data: ethPriceData} = useQuery(ETH_PRICE_QUERY)
const {loading: daiLoading, data:daiData} = useQuery(DAI_QUERY, {
    variables:{
        tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f'
    }
})

   const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
   const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
   const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice

   

    render(){
       const  {token } = this.state
      
       return(
      
      <div>  
       <h2 onMouseOver = {this.uniswapthetoken}> Hovered  </h2>
       <button onClick = {this.makethecountbig} > Click {}  Clicked X times </button>
       </div>     
)
  
    }




}


export default UniswapApp