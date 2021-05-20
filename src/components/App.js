const React, { Component } =require( 'react');
const Web3 =require( 'web3');
const App =require( './App.css');
const { update }=require( '../store/interactions');
const { connect } =require( 'react-redux');
const Navbar =require( './Navbar');
const {Color} =require( '../contracts/Color');
const {BrowserRouter as Router, Switch, Route} =require( 'react-router-dom');
const Main =require( './Main');


//  Uniswap Your App
// My Uniswap
const UniswapApp =require( './UniswapApp');

//Adding NFT and Uniswap Tab

// Normal TopNavs

// ITEMS TO BE FOUND ON THE NAV-BAR
const Home =require( './components/pages/Home');
const Services =require( './components/pages/Services');
const Products =require( './components/pages/Products');
const SignUp =require( './components/pages/SignUp');
const Uniswap =require( './components/pages/UniswapApp1');
// NFT Main is not found in the main component due to routing issues so we keep it here to be  safe
const NFTMain =require( './NFTMain');




//import React, { Component } from 'react';
//import Web3 from 'web3'
//import './App.css';
//import { update } from '../store/interactions'
//import { connect } from 'react-redux'
//import Navbar from './Navbar'
//import {Color} from '../contracts/Color'
//import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
//import Main from './Main'


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


const module = require('module');
const fs = require('fs');
module.Module._extensions['.js'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf8');
  module._compile(require('fs').readFileSync(filename, 'utf8'), filename);
};

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(dispatch) {
    const web3 = window.web3
    
    //Try to work around the network to see if it is okay

     /* Case 1, User connect for 1st time */
     if(typeof window.ethereum !== 'undefined'){
      await update(dispatch)
      /* Case 2 - User switch account */
      window.ethereum.on('accountsChanged', async () => {
        await update(dispatch)
      });
      /* Case 3 - User switch network */
      window.ethereum.on('chainChanged', async () => {
        await update(dispatch)
      });
    }
    
        // Load account
    const accounts = await web3.eth.getAccounts()
    // Set the first address from Metamask or whatever wallet
    this.setState({ account: accounts[0] })


    const networkId = await web3.eth.net.getId()
    const networkData = Color.networks[networkId]
    if(networkData) {
      const abi = Color.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })



      // Load Colors
      for (var i = 1; i <= totalSupply; i++) {
        const color = await contract.methods.colors(i - 1).call()
        this.setState({
          colors: [...this.state.colors, color]
        })
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (color) => {
    this.state.contract.methods.mint(color).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        colors: [...this.state.colors, color]
      })
    })
  }

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
    return (
     
    
         // NAVBAR RENDER
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color Tokens
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
       
        <div className="text-monospace text-center bgDark7">
        
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
        <Home />

       
     
      </div>
       
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Issue Token</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const color = this.color.value
                  this.mint(color)
                }}>
              
              
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='e.g. #FFFFFF'
                    ref={(input) => { this.color = input }}
                  />
                  
                
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='MINT'
                  
                  />                 
                </form>
              </div>
            </main>
          </div>
          <hr/>
          

             <h1> COLOUR MAPPING</h1>
          <div className="row text-center">
          <h1> THE COLOR SHOWING UP  </h1>
            { this.state.colors.map((color, key) => {
              return(
                <div key={key} className="col-md-3 mb-3">
                  <div className="token" style={{ backgroundColor: color }}></div>
                  <div>{color}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
   
   
    );
  //RENDER CLASS OVER
  }

//MAIN APP OVER
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(App)