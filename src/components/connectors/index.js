
const { InjectedConnector } =require ('@web3-react/injected-connector');
const { WalletConnectConnector } =require ('@web3-react/walletconnect-connector');
const { WalletLinkConnector } =require ('@web3-react/walletlink-connector');
const { PortisConnector } =require ('@web3-react/portis-connector');

const { NetworkConnector } =require ('./Network');
const  { FortmaticConnector } = require ('./Fortmatic');



// THE CONNECTION SEEN HERE

//import { InjectedConnector } from '@web3-react/injected-connector'
//import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
//import { WalletLinkConnector } from '@web3-react/walletlink-connector'
//import { PortisConnector } from '@web3-react/portis-connector'

//import { NetworkConnector } from './Network'
//import { FortmaticConnector } from './Fortmatic'


// THIS IS WHERE THE INDEX JS IS HERE 
// THIS IS THE FORTMATIC CONNECTOR HERE
//THIS IS HOW THE WEB-3 CONNECTION REACTORS IS DONE 

const POLLING_INTERVAL = 10000
const NETWORK_URL =
  process.env.REACT_APP_IS_PRODUCTION_DEPLOY === 'true'
    ? process.env.REACT_APP_NETWORK_URL_PROD
    : process.env.REACT_APP_NETWORK_URL

    // Network Connector is found here
export const network = new NetworkConnector({
  urls: { [Number(process.env.REACT_APP_CHAIN_ID)]: NETWORK_URL },
  pollingInterval: POLLING_INTERVAL * 3
})

export const injected = new InjectedConnector({
  supportedChainIds: [Number(process.env.REACT_APP_CHAIN_ID)]
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: false,
  pollingInterval: POLLING_INTERVAL
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_KEY,
  chainId: 1
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_ID,
  networks: [1]
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg'
})
 