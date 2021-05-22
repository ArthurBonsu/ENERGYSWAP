//pragma solidity ^0.5.5;
pragma solidity >=0.4.16 <0.9.0;
interface IUniswapV2Library {
   

  function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1);
  function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair);
function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB);
 function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB); 
function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut);
function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn);
function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts);
 function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts);

}