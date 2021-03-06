const React, { useEffect, useRef } =require( 'react');

const styled =require( 'styled-components');

const { useWeb3React } =require( '../../hooks');
const Jazzicon =require( 'jazzicon');



//import React, { useEffect, useRef } from 'react'

//import styled from 'styled-components'

//import { useWeb3React } from '../../hooks'
//import Jazzicon from 'jazzicon'
const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: ${({ theme }) => theme.silverGray};
`

export default function Identicon() {
  const ref = useRef()

  const { account } = useWeb3React()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)))
    }
  }, [account])

  return <StyledIdenticon ref={ref} />
}
