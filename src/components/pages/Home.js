//import React from 'react';
//import '../../App.css';
//mport Cards from '../Cards';
//import ProjectMain from '../ProjectMain';
//import Footer from '../Footer';

// ITEMS TO BE FOUND ON THE NAV-BAR
//import Home from './components/pages/Home'
//import Services from './components/pages/Services'
//import Products from './components/pages/Products'
//import SignUp from './components/pages/SignUp'
//import Uniswap from './components/pages/UniswapApp1'
// NFT Main is not found in the main component due to routing issues
//import NFTMain from  '../NFTMain'




const React =require(  'react');
const App =require( '../../App.css');
const Cards =require(  '../Cards');
const ProjectMain =require(  '../ProjectMain');
const Footer =require(  '../Footer');

// ITEMS TO BE FOUND ON THE NAV-BAR
const Home =require(  './components/pages/Home');
const Services =require(  './components/pages/Services');
const Products =require(  './components/pages/Products');
const SignUp =require(  './components/pages/SignUp');
const Uniswap =require(  './components/pages/UniswapApp1');
// NFT Main is not found in the main component due to routing issues
const NFTMain =require(   '../NFTMain');

function Home() {
  return (
    <>
     
      <ProjectMain />
      
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
