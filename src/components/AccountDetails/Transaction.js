

// For Transaction 
const React =require ( 'react');
const styled, { keyframes } =require ( 'styled-components');
const { Check } =require ( 'react-feather');

const { useWeb3React }=require (  '../../hooks');
const { getEtherscanLink } =require (  '../../utils');
const { Link, Spinner } =require ( '../../theme');
const Copy =require (  './Copy');
const Circle =require (  '../../assets/images/circle.svg');

const { transparentize } =require (  'polished');

 // INPUT PANEL {Search Name and Address}
//import React from 'react'
//import styled, { keyframes } from 'styled-components'
//import { Check } from 'react-feather'

//import { useWeb3React } from '../../hooks'
//import { getEtherscanLink } from '../../utils'
//import { Link, Spinner } from '../../theme'
//import Copy from './Copy'
//import Circle from '../../assets/images/circle.svg'

//import { transparentize } from 'polished'

const TransactionStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TransactionWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: space-between;
  width: 100%;
  margin-top: 0.75rem;
  a {
    /* flex: 1 1 auto; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    max-width: 250px;
  }
`

const TransactionStatusText = styled.span`
  margin-left: 0.5rem;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
//Etherscan pending  design with Green connected
const TransactionState = styled.div`
  display: flex;
  background-color: ${({ pending, theme }) =>
    pending ? transparentize(0.95, theme.royalBlue) : transparentize(0.95, theme.connectedGreen)};
  border-radius: 1.5rem;
  padding: 0.5rem 0.75rem;
  font-weight: 500;
  font-size: 0.75rem;
  border: 1px solid;
  border-color: ${({ pending, theme }) =>
    pending ? transparentize(0.75, theme.royalBlue) : transparentize(0.75, theme.connectedGreen)};

  #pending {
    animation: 2s ${rotate} linear infinite;
  }

  :hover {
    border-color: ${({ pending, theme }) =>
      pending ? transparentize(0, theme.royalBlue) : transparentize(0, theme.connectedGreen)};
  }
`
const ButtonWrapper = styled.div`
  a {
    color: ${({ pending, theme }) => (pending ? theme.royalBlue : theme.connectedGreen)};
  }
`
//THis is for showing transaction link at the bottom of the page. You click on the transaction
//Llink and it sends you to Etherscan
// Etherscan
// For Transactions to be submitted on swap,the spinner spins and the transaction is confirmed
export default function Transaction({ hash, pending }) {
  const { chainId } = useWeb3React()

  return (
    <TransactionWrapper key={hash}>
      <TransactionStatusWrapper>
        
        <Link href={getEtherscanLink(chainId, hash, 'transaction')}>{hash} ↗ </Link>
        <Copy toCopy={hash} />
      </TransactionStatusWrapper>
      {pending ? (
        <ButtonWrapper pending={pending}>
          <Link href={getEtherscanLink(chainId, hash, 'transaction')}>
            <TransactionState pending={pending}>
              
              <Spinner src={Circle} id="pending" />
              <TransactionStatusText>Pending</TransactionStatusText>
            </TransactionState>
          </Link>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper pending={pending}>
          <Link href={getEtherscanLink(chainId, hash, 'transaction')}>
            <TransactionState pending={pending}>
              <Check size="16" />
              <TransactionStatusText>Confirmed</TransactionStatusText>
            </TransactionState>
          </Link>
        </ButtonWrapper>
      )}
    </TransactionWrapper>
  )
}
