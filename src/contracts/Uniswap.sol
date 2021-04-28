pragma solidity ^0.5.5;

interface IUniswap{
    function swapExactTokensForEth
    uint amountIn,
    uint amountOutMin,
    address[] calldata path,
    address to, uint deadline)
    external
    virtual override ensure(deadline) returns (uint[] memory amounts)

    function WETH() external pure returns (address);
    interface IERC20{
        function transferFrom(address sender, address recipient,uint256 amount )

    }
  
  contract MyDefiProject

    
    }