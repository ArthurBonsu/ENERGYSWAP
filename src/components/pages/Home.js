import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import ProjectMain from '../ProjectMain';
import Footer from '../Footer';

// ITEMS TO BE FOUND ON THE NAV-BAR
import Home from './components/pages/Home'
import Services from './components/pages/Services'
import Products from './components/pages/Products'
import SignUp from './components/pages/SignUp'
import Uniswap from './components/pages/UniswapApp1'
// NFT Main is not found in the main component due to routing issues
import NFTMain from  '../NFTMain'


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
