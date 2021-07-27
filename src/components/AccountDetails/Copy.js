

//For Copying
const React = require('react');
const styled = require('styled-components');
const {useCopyClipboard} = require('../../hooks');
const {Link} = require('../../theme');
const { CheckCircle, Copy } = require('react-feather');


//import React from 'react'
//import styled from 'styled-components'
//import { useCopyClipboard } from '../../hooks'

//import { Link } from '../../theme'
//import { CheckCircle, Copy } from 'react-feather'

// COMPONENTS OF THE UI SHOWN HERE
const CopyIcon = styled(Link)`
  color: ${({ theme }) => theme.silverGray};
  flex-shrink: 0;
  margin-right: 1rem;
  margin-left: 0.5rem;
  text-decoration: none;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.doveGray};
  }
`
const TransactionStatusText = styled.span`
  margin-left: 0.25rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`

export default function CopyHelper({ toCopy }) {
  const [isCopied, setCopied] = useCopyClipboard()


  // tocopy is the value we pass through the CopyIcon
  return (
    <CopyIcon onClick={() => setCopied(toCopy)}>
      {isCopied ? (
        <TransactionStatusText>
          <CheckCircle size={'16'} />
          <TransactionStatusText>Copied</TransactionStatusText>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <Copy size={'16'} />
        </TransactionStatusText>
      )}
    </CopyIcon>
  )
}
