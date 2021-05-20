// THIS IS TO CONNECT TO METAMASK AND CONNECT TO CONTRACT
const { useState, useMemo, useCallback, useEffect, useRef } =require( 'react');

// THIS SERVSES AS A CONNECTOR A SMART CONTRACT HERE
const { useWeb3React as useWeb3ReactCore } =require('@web3-react/core');
const copy =require( 'copy-to-clipboard');
const { isMobile } =require( 'react-device-detect');

// WE GET THE CONTRACT BEFORE HOOKS HERE

const { NetworkContextName } =require( '../constants');
const ERC20_ABI =require( '../constants/abis/erc20');
const { getContract, getFactoryContract, getExchangeContract, isAddress } =require(  '../utils');

// WE USE THE INJECT
const { injected } =require( '../connectors');





// THIS IS TO CONNECT TO METAMASK AND CONNECT TO CONTRACT
//import { useState, useMemo, useCallback, useEffect, useRef } from 'react'

// THIS SERVSES AS A CONNECTOR A SMART CONTRACT HERE
//import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
//import copy from 'copy-to-clipboard'
//import { isMobile } from 'react-device-detect'

// WE GET THE CONTRACT BEFORE HOOKS HERE

//import { NetworkContextName } from '../constants'
//import ERC20_ABI from '../constants/abis/erc20'
//import { getContract, getFactoryContract, getExchangeContract, isAddress } from '../utils'

// WE USE THE INJECT
//import { injected } from '../connectors'

 // REACT CONNECTION TO THE CONSTANTS WHAT DOES CONTSTATNHAVE

 // CONSTANTS CONTAIN THE LIST OF TOKEN INFO, OR ERC INFORMATION, CONTRAINS CONTRACTS ABI 
// THE CONTRACTS THERE ARE THE EXCHANGE CONTRACTS HERE AND THE  FACTORY CONTRACTS HERE
// THE FULL CONTRACTS INVOLVE NETWORKCONTEXT HERE AND IT PICKS IT UP
export function useWeb3React() {
  const context = useWeb3ReactCore()
  const contextNetwork = useWeb3ReactCore(NetworkContextName)

  return context.active ? context : contextNetwork
}

// HOOK HERE 
// METAMASK CONNECTS HERE, WE GET THE COONNECTOR 

export function useEagerConnect() {

   // HOOK IS PASSED TO TAKE THE CONTEXT AND VALUES MUCH LIKE CONTEXT
  const { activate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {

          // SET TRY TO TRYING TO CONNECT WITH THE APP
          setTried(true)
        }
      }
    })
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
 // THE INACTIVELISTENER , HANDLE NETWORK CHANGES

 // CHECKING INACTIVE LISTENER INFORMATION HERE
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does
      // HAVE TO CHECK FOR METAMASK TOO
  useEffect(() => {
    const { ethereum } = window

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch(() => {})
      }

      const handleAccountsChanged = accounts => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch(() => {})
        }
      }
      // CHANGES THE HANDLENETWORK CHANGE
      const handleNetworkChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch(() => {})
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('networkChanged', handleNetworkChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }

    return () => {}
  }, [active, error, suppress, activate])
}


// CONSTANTS TO HOOKS, 
// modified from https://usehooks.com/useDebounce/

// SET USEDEBOUNCE VALUE
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// modified from https://usehooks.com/useKeyPress/
// THE BODYKEY DOWN
export function useBodyKeyDown(targetKey, onKeyDown, suppressOnKeyDown = false) {
  const downHandler = useCallback(
    event => {
      const {
        target: { tagName },
        key
      } = event
      if (key === targetKey && tagName === 'BODY' && !suppressOnKeyDown) {
        event.preventDefault()
        onKeyDown()
      }
    },
    [targetKey, onKeyDown, suppressOnKeyDown]
  )

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, [downHandler])
}

//WE GET THE ENS NAME HERE
// WE GET THE ETHEREUM NETWORK ADDRESS, IS IT ALSO IN CONSTANTS , CONTEXT TOO, CONNECTORS
export function useENSName(address) {
  const { library } = useWeb3React()

  const [ENSName, setENSName] = useState()

  useEffect(() => {
    if (isAddress(address)) {
      let stale = false
      library
        .lookupAddress(address)
        .then(name => {
          if (!stale) {
            if (name) {
              setENSName(name)
            } else {
              setENSName(null)
            }
          }
        })
        .catch(() => {
          if (!stale) {
            setENSName(null)
          }
        })

      return () => {
        stale = true
        setENSName()
      }
    }
  }, [library, address])

  return ENSName
}

// returns null on errors
// GET THE CONTRACT INFO HERE

// THIS IS THE CONTRACT TO ENABLE US USE THE CONTRACT HERE

export function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useWeb3React()

  return useMemo(() => {
    try {
      return getContract(address, ABI, library, withSignerIfPossible ? account : undefined)
    } catch {
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

// returns null on errors
// USE THE TOKEN ADDRESSS CONTRACT HERE
export function useTokenContract(tokenAddress, withSignerIfPossible = true) {
   // THIS IS HOW YOU CONNECT OVER REACT AND CONNECT TO A CONTRACT
  const { library, account } = useWeb3React()

  return useMemo(() => {
    try {
      return getContract(tokenAddress, ERC20_ABI, library, withSignerIfPossible ? account : undefined)
    } catch {
      return null
    }
  }, [tokenAddress, library, withSignerIfPossible, account])
}

// returns null on errors

 // factory contracts here
export function useFactoryContract(withSignerIfPossible = true) {
  const { chainId, library, account } = useWeb3React()

   // MEMO THIS IS WHAT WE HAVE
  return useMemo(() => {
    try {
      return getFactoryContract(chainId, library, withSignerIfPossible ? account : undefined)
    } catch {
      return null
    }
  }, [chainId, library, withSignerIfPossible, account])
}

// WE CONNECT TO THE EXCHANGES WITH THIS 
export function useExchangeContract(exchangeAddress, withSignerIfPossible = true) {
  const { library, account } = useWeb3React()
 
  // RETURN MEMO? WHAT IS MEMO FOR
  return useMemo(() => {
    try {
      return getExchangeContract(exchangeAddress, library, withSignerIfPossible ? account : undefined)
    } catch {
      return null
    }
  }, [exchangeAddress, library, withSignerIfPossible, account])
}


 // COPY CLIIPBOARD, USE IT TO COPY STUFF
export function useCopyClipboard(timeout = 500) {
  const [isCopied, setIsCopied] = useState(false)

  const staticCopy = useCallback(text => {
    const didCopy = copy(text)
    setIsCopied(didCopy)
  }, [])

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false)
      }, timeout)

      return () => {
        clearTimeout(hide)
      }
    }
  }, [isCopied, setIsCopied, timeout])

  return [isCopied, staticCopy]
}

// modified from https://usehooks.com/usePrevious/

// USE PREVIOUS HERE
export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}
