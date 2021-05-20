const React, { Component,useState, useEffect } =require( 'react');
const { connect } =require( 'react-redux');
const Identicon =require( 'identicon.js');
const eth  =require( '../images/eth.png');
const { Button } =require( './Button');
const { Link } =require( 'react-router-dom');
const {MenuItems}=require( "./MenuItems");
const Navbar =require( './Navbar.css');

// ITEMS TO BE FOUND ON THE NAV-BAR
const Home =require( './components/pages/Home');
const Services =require( './components/pages/Services');
const Products =require( './components/pages/Products');
const SignUp =require( './components/pages/SignUp');
const Uniswap=require('./components/pages/UniswapApp1');
const NFTMain =require('./NFTMain');
const {accountSelector} =require('../store/selectors')
const {balanceSelector} =require('../store/selectors')
const {networkSelector} =require('../store/selectors')
const style =require('./Style.css')

//const {
//  accountSelector,
 // balanceSelector,
 // networkSelector,
  //web3Selector,
//} from '../store/selectors'
//const './Style.css'
 





//import React, { Component,useState, useEffect } from 'react'
//import { connect } from 'react-redux'
//import Identicon from 'identicon.js'
//import eth from '../images/eth.png'
//import { Button } from './Button'
//import { Link } from 'react-router-dom'
//import {MenuItems} from "./MenuItems"
//import './Navbar.css'

// ITEMS TO BE FOUND ON THE NAV-BAR
//import Home from './components/pages/Home'
//import Services from './components/pages/Services'
//import Products from './components/pages/Products'
//import SignUp from './components/pages/SignUp'
//import Uniswap from './components/pages/UniswapApp1'
//import NFTMain from './NFTMain'

//import {
  //accountSelector,
  //balanceSelector,
  //networkSelector,
  //web3Selector,
//} from '../store/selectors'
//import './Style.css'

class Navbar extends Component {

   constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

// THIS ISS ANOTHER WAY TO SET THE HANDLER FOR THE NAVIGATION BAR AND DTHEN SET THE NAVIGATIONAL BUTTON ON OR OFF
// THIS IS ALSO ANOTHER WAY OF UTILIZING ROUTING BY PULLING THE CONTENTS FROM THE MENU LIST
/*
  <div className= "menu-icon" oncClick={this.handleClick}>
                      <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}> </i>
                     <ul>  
                        
                       </div> 

                       // WE CAN SEE  THE INFORMATION PULLED FROM THE MENU LIST

                     <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}> 
                       {MenuItems.map((item, index) => {
                        return (<li key={index}> 
                        <a className={item.cName} href={item.url}>
                        {item.title} </a> </li> )
                        })
                        }
                       
                        </ul>  
                        */

  render() {
    return (
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/NFTMain' className='navbar-logo' onClick={closeMobileMenu}>
            Nfts
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='./components/pages/Home' className='nav-links' onClick={closeMobileMenu}>
               Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='./components/pages/Services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='./components/pages/Products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
              <li className='nav-item'>
              <Link
                to='./components/pages/Uniswap1'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Uniswap
              </Link>
            </li>
             
            <li>
              <Link
                to='components/pages/Sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        
          {button && <Button onClick={SignUp} buttonStyle='btn--outline'>SIGN UP</Button>}
        
        </div>
            
                          
          {this.props.account ? (
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <div className="container">
                <div className="row">
                  <div className="rounded network">
                    <li className="nav-item nav-link small">
                     
                      <b>{this.props.network}</b>
                    </li>
                  </div>
                  <div className="rounded balance">
                    <li className="nav-item nav-link small">


                      <b>{this.props.balance}</b>
                      <img src={eth} width="18" height="18" alt="eth" />
                    </li>
                  </div>
                  <div className="rounded account">
                    <li className="nav-item nav-link small">
                      {this.props.network === 'Main' ||
                      this.props.network === 'Private' ||
                      this.props.network === 'Wrong network' ? (
                        <b>
                          <a
                            style={{ color: '#55FF55' }}
                            href={
                              `https://etherscan.io/address/` +
                              this.props.account
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {this.props.account.substring(0, 5) +
                              '...' +
                              this.props.account.substring(38, 42)}
                            &nbsp;
                          </a>
                        </b>
                      ) : (
                        <b>
                          <a
                            style={{ color: '#55FF55' }}
                            href={
                              `https://${this.props.network}.etherscan.io/address/` +
                              this.props.account
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {this.props.account.substring(0, 6) +
                              '...' +
                              this.props.account.substring(38, 42)}
                          </a>
                        </b>
                      )}
                      <img
                        alt="id"
                        className="id border border-success"
                        width="20"
                        height="20"
                        src={`data:image/png;base64,${new Identicon(
                          this.props.account,
                          30,
                        ).toString()}`}
                      />
                    </li>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        ) : (
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              {this.props.web3 ? (
                <button
                  type="Success"
                  className="btn btn-outline btn-block "
                  style={{ backgroundColor: '#55FF55', color: '#000000' }}
                  onClick={async () => {
                    try {
                      await window.ethereum.enable()
                    } catch (e) {
                      console.log(e)
                    }
                  }}
                >
                
                  L o g i n
                </button>
              ) : (
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={() => {
                    try {
                      window.open('https://metamask.io/')
                    } catch (e) {
                      console.log(e)
                    }
                  }}
                >
                  Get MetaMask
                </button>
              )}
            </ul>
          </div>
        )}
      </nav>
    )
}}

function mapStateToProps(state) {
  return {
    web3: web3Selector(state),
    account: accountSelector(state),
    network: networkSelector(state),
    balance: balanceSelector(state),
  }
  

export default connect(mapStateToProps)(Navbar)
