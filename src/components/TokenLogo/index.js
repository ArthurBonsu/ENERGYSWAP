const React, { useState }  =require( 'react');
const styled =require( 'styled-components');
const { isAddress } =require( '../../utils');

const { ReactComponent as EthereumLogo } =require( '../../assets/images/ethereum-logo.svg');


//import React, { useState } from 'react'
//import styled from 'styled-components'
//import { isAddress } from '../../utils'

//import { ReactComponent as EthereumLogo } from '../../assets/images/ethereum-logo.svg'

//import React, { useState } from 'react'
//import styled from 'styled-components'
//import { isAddress } from '../../utils'

//import { ReactComponent as EthereumLogo } from '../../assets/images/ethereum-logo.svg'


// TOKEN ICON API, PICKS UP THE ADDRESS FROM UTILS
const TOKEN_ICON_API = address =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
    address
  )}/logo.png`
const BAD_IMAGES = {}
// THIS SERVES AS AN IMAGE ATTRIBUTE THAT CAN BE USED AT ANY PLACE IN MANY COMPONENTS
const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 1rem;
`

// EMOJI FOR THE TOKEN LOGO IS SHOWN
const Emoji = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`


// ETHEREUM STYLINIT THE ETHEREUM PICTURE
const StyledEthereumLogo = styled(EthereumLogo)`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

// THE TOKENLOGO 
export default function TokenLogo({ address, size = '1rem', ...rest }) {
  const [error, setError] = useState(false)

  let path = ''
  // PICKS UP THE ADDRESS AS ETH
  if (address === 'ETH') {
    // SHOWS THE ETHEREUM LOGO
    return <StyledEthereumLogo size={size} />

    // IF NOT FOUND IN THE LIST OF ADDRESSES HAVING BAD IMAGES
    // SET THE TOKEN API TO THE PATH AN MAKE A L OWER CASE
    //SET THE IMAGE TO THE ADDRESS LINK, THIS IS HOW YOU SET A LOGO TO A LINK
  } else if (!error && !BAD_IMAGES[address]) {
    path = TOKEN_ICON_API(address.toLowerCase())
  } else {

    // ELSE MAKE IT LOOK LIKE YOU ARE THINKING BY SHOWING
    return (
      <Emoji {...rest} size={size}>
        <span role="img" aria-label="Thinking">
          🤔
        </span>
      </Emoji>
    )
  }

  return (
    <Image
      {...rest}
      alt={address}
      src={path}
      size={size}
      onError={() => {
        BAD_IMAGES[address] = true
        setError(true)
      }}
    />
  )
}
