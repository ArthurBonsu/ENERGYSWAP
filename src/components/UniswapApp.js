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


const {loading:ethLoading, data: ethPriceData} = useQuery(ETH_PRICE_QUERY)
const {loading: daiLoading, data:daiData} = useQuery(DAI_QUERY, {
    variables:{
        tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f'
    }
})

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

    uniswapthetoken= () => {
    this.setState(prevState => {
       return {token:prevState.token + 1}

    })

    } 




 makethecountbig= () => {
    this.setState({
        
        // css: makebig
          
        

    })

    } 

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