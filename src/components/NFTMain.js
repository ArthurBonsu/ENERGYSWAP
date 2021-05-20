const ReactTypingEffect =require('react-typing-effect');
const { buyNft } =require( '../store/interactions');
const React, { Component } =require( 'react');
const App =require('./App.css');
const { connect } =require( 'react-redux');
const Identicon =require( 'identicon.js');
const Loading =require( './Loading');
const Cards =require( './Cards');
const ProjectMain =require('./ProjectMain');
const Footer =require('../Footer');
const { update }=require( '../store/interactions');
const Navbar =require( './Navbar');
const {Color} =require( '../contracts/Color');
// WHAT IS BROWSER ROUTER FOR , OH OKAY THE ROUES DEPEND ON IT REALLY
const {BrowserRouter as Router, Switch, Route} =require( 'react-router-dom');


//  Uniswap Your App
// My Uniswap
const UniswapApp =require( './UniswapApp');

//Adding NFT and Uniswap Tab

// Normal TopNavs

// ITEMS TO BE FOUND ON THE NAV-BAR
const Home =require( './components/pages/Home');
const Services=require( './components/pages/Services');
const Products =require( './components/pages/Products');
const SignUp =require( './components/pages/SignUp');
const Uniswap =require('./components/pages/UniswapApp1');
// NFT Main is not found in the main component due to routing issues so we keep it here to be  safe
const NFTMain =require(  './NFTMain');

const {contractSelector,  metadataSelector,  nftStateSelector,  networkSelector,} =require('../store/selectors');



//import ReactTypingEffect from 'react-typing-effect'
//import { buyNft } from '../store/interactions'
//import React, { Component } from 'react'
//import './App.css';
//import { connect } from 'react-redux'
//import Identicon from 'identicon.js'
//import Loading from './Loading'
//import Cards from './Cards';
//import ProjectMain from './ProjectMain'
//import Footer from '../Footer';
//import { update } from '../store/interactions'
//import Navbar from './Navbar'
//import {Color} from '../contracts/Color'
// WHAT IS BROWSER ROUTER FOR , OH OKAY THE ROUES DEPEND ON IT REALLY
//import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


//  Uniswap Your App
// My Uniswap
//import UniswapApp from './UniswapApp'

//Adding NFT and Uniswap Tab

// Normal TopNavs

// ITEMS TO BE FOUND ON THE NAV-BAR
//import Home from './components/pages/Home'
//import Services from './components/pages/Services'
//import Products from './components/pages/Products'
//import SignUp from './components/pages/SignUp'
//import Uniswap from './components/pages/UniswapApp1'
// NFT Main is not found in the main component due to routing issues so we keep it here to be  safe
//import NFTMain from  './NFTMain'

//import {
//  contractSelector,
 // metadataSelector,
 // nftStateSelector,
 // networkSelector,
//} from '../store/selectors'



// NAVIGATIONALL BAR
// CARDS AND FOOTERS
// NFT MAIN PAGE WITH PICTURES
class NFTMain extends Component {

 constructor(props) {
    super(props)
    this.state = {
      //We initially set an empty content for the account
      account: '',
      contract: null,
      totalSupply: 0,
      colors: []
    }
  }

  render() {


    <Router>
    <Navbar />
    <Switch>
      
      <Route path='./components/pages/Home' exact component={Home} />
      <Route path='./components/pages/UniswappApp1' exact component={UniswapApp1} />
      <Route path='./components/pages/Services' component={Services} />
      <Route path='./components/pages/Products' component={Products} />
      <Route path='./components/pages/Signup' component={SignUp} />
        <Route path='./NFTMain' component={NFTMain} />
    </Switch>
  </Router>
   

    try {
      return (
                 // THE DOMS
        <div className="Main">
          <div
            className="container-fluid mt-5"
            style={{ color: '#55FF55', backgroundColor: '#1D1D1D' }}
          >
            <br></br>

        
            <div>
              <ReactTypingEffect
                text={[
                  'Welcome to NFT Digital Art - X',
                  'Presented by Elisha Day 🎓',
                  'Look around and choose the NFT you like',
                  'Click "Buy" to get UNIQUE 💎 NFT',
                  'Hurry up before all NFTs are sold out!',
                ]}
                speed="40"
                eraseSpeed="10"
                eraseDelay="2000"
                cursorRenderer={(cursor) => <h1>{cursor}</h1>}
                displayTextRenderer={(text, i) => {
                  return (
                    <h1>
                      {text.split('').map((char, i) => {
                        const key = `${i}`
                        return (
                          <span key={key} style={i % 2 === 0 ? {} : {}}>
                            {char}
                          </span>
                        )
                      })}
                    </h1>
                  )
                }}
              />
            </div>
            <br></br>&nbsp;
            <img
              src={'https://i.gyazo.com/ed6df2ee521e82ae2498da1af3454c52.png'}
              style={{ width: '1000px', height: '300px' }}
              alt="adam"
            />


            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  <div
                    className="row justify-content-around"
                    style={{ width: '1000px', fontSize: '13px' }}
                  >
                    {this.props.metadata.map((nft, key) => {
                      return (
                        <div className="p-3" key={key}>
                          {this.props.nftState[nft.id] ? (
                            <a
                              href={nft.image}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={`data:image/png;base64,${nft.img}`}
                                style={{
                                  border: '1mm ridge #8B8B8B',
                                  width: '200px',
                                  height: '300px',
                                }}
                                alt="art"
                              />
                            </a>
                          ) : (
                            <a
                              href={nft.image}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={`data:image/png;base64,${nft.img}`}
                                style={{
                                  border: '1mm ridge #55FF55',
                                  width: '200px',
                                  height: '300px',
                                }}
                                alt="art"
                              />
                            </a>
                          )}
                          <p></p>
                          <table style={{ width: '200px' }}>
                            <thead>
                              <tr>
                                <th
                                  className="text-left"
                                  style={{ color: '#8B8B8B' }}
                                >
                                  ID:{' '}
                                </th>
                                <th style={{ color: '#FFFFFF' }}>{nft.id}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th
                                  className="text-left"
                                  style={{ color: '#8B8B8B' }}
                                >
                                  URI:{' '}
                                </th>
                                <td>
                                  <a
                                    href={nft.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#55FF55' }}
                                  >
                                    link
                                  </a>
                                </td>
                              </tr>
                              {this.props.nftState[nft.id] ? (
                                <tr>
                                  <th
                                    className="text-left"
                                    style={{ color: '#8B8B8B' }}
                                  >
                                    Owner:
                                  </th>
                                  <th>
                                    <img
                                      alt="id"
                                      className="ml-2 id border border-success"
                                      width="15"
                                      height="15"
                                      src={`data:image/png;base64,${new Identicon(
                                        this.props.nftState[nft.id],
                                        30,
                                      ).toString()}`}
                                    />{' '}
                                    <a
                                      href={
                                        `https://etherscan.io/address/` +
                                        this.props.nftState[nft.id]
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        color: '#55FF55',
                                        fontWeight: 'normal',
                                      }}
                                    >
                                      {this.props.nftState[nft.id].substring(
                                        0,
                                        8,
                                      ) + '...'}
                                    </a>
                                  </th>
                                </tr>
                              ) : (
                                <tr>
                                  <th
                                    className="text-left"
                                    style={{ color: '#8B8B8B' }}
                                  >
                                    Price:{' '}
                                  </th>
                                  <th style={{ color: '#FFFFFF' }}>
                                    {nft.price / 10 ** 18} ETH
                                  </th>
                                </tr>
                              )}
                            </tbody>
                          </table>
                          <p></p>
                          {this.props.nftState[nft.id] ? (
                            <button
                              type="Success"
                              className="btn btn-block"
                              style={{
                                border: '1px ridge #8B8B8B',
                                color: '#8B8B8B',
                                width: '200px',
                              }}
                              onClick={(e) =>
                                buyNft(this.props.dispatch, nft.id, nft.price)
                              }
                              disabled
                            >
                              <b>S o l d</b>
                            </button>
                          ) : (
                            <button
                              type="Success"
                              className="btn btn-block btn-outline"
                              style={{
                                border: '1px ridge #55FF55',
                                color: '#55FF55',
                                width: '200px',
                              }}
                              onClick={(e) =>
                                buyNft(this.props.dispatch, nft.id, nft.price)
                              }
                            >
                              <b>B u y</b>
                            </button>
                          )}
                          &nbsp;
                        </div>
                      )
                    })}
                  </div>
                </div>
              </main>
            </div>
          </div>
          <br></br>
          <footer>
            {this.props.contract ? (
              <div style={{ color: '#8B8B8B', fontSize: '14px' }}>
                NFT deployed at:&nbsp;
                <a
                  href={
                    `https://${this.props.network}.etherscan.io/address/` +
                    this.props.contract._address
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#55FF55' }}
                >
                  {this.props.contract._address}
                </a>
              </div>
            ) : (
              <div> Wrong network </div>
            )}
          </footer>
          
        </div>
      )
    } catch (e) {
      return <Loading />
    }
  }
}

function mapStateToProps(state) {
  return {
    metadata: metadataSelector(state),
    contract: contractSelector(state),
    nftState: nftStateSelector(state),
    network: networkSelector(state),
  }
}

export default connect(mapStateToProps)(Main)
