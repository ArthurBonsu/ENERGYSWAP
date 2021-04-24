import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App'
import configureStore from './store/configureStore'
import * as serviceWorker from './serviceWorker'
import {ApolloProvider} from 'react-apollo'
import {client} from './components/UniswapApp' 
import UniswapApp from './components/UniswapApp'

import ReactGA from 'react-ga'
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import { ethers } from 'ethers'

import { NetworkContextName } from './constants'
import { isMobile } from 'react-device-detect'
import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from './contexts/LocalStorage'
import ApplicationContextProvider, { Updater as ApplicationContextUpdater } from './contexts/Application'
import TransactionContextProvider, { Updater as TransactionContextUpdater } from './contexts/Transactions'
import BalancesContextProvider, { Updater as BalancesContextUpdater } from './contexts/Balances'
import TokensContextProvider from './contexts/Tokens'
import AllowancesContextProvider from './contexts/Allowances'

import ThemeProvider, { GlobalStyle } from './theme'
import './i18n'


const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 10000
  return library
}

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-128182339-1')
  ReactGA.set({
    customBrowserType: !isMobile ? 'desktop' : window.web3 || window.ethereum ? 'mobileWeb3' : 'mobileRegular'
  })
} else {
  ReactGA.initialize('test', { testMode: true })
}


ReactGA.pageview(window.location.pathname + window.location.search)

function ContextProviders({ children }) {
  return (
    <LocalStorageContextProvider>
      <ApplicationContextProvider>
        <TransactionContextProvider>
          <TokensContextProvider>
            <BalancesContextProvider>
              <AllowancesContextProvider>{children}</AllowancesContextProvider>
            </BalancesContextProvider>
          </TokensContextProvider>
        </TransactionContextProvider>
      </ApplicationContextProvider>
    </LocalStorageContextProvider>
  )
}

function Updaters() {
  return (
    <>
      <LocalStorageContextUpdater />
      <ApplicationContextUpdater />
      <TransactionContextUpdater />
      <BalancesContextUpdater />
    </>
  )
}


ReactDOM.render(
  <Provider store={configureStore()}>
        <UniswapApp />
        </Provider>,
        <ApolloProvider client={client}>
        <App /> 
        </ApolloProvider> ,

<Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderNetwork getLibrary={getLibrary}>
      <ContextProviders>
        <Updaters />
        <ThemeProvider>
          <>       
            <GlobalStyle />
            <App />
          </>
        </ThemeProvider>
      </ContextProviders>
    </Web3ProviderNetwork>
  </Web3ReactProvider>,

  document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
