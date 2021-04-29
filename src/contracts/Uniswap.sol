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

  function _addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin
    ) internal virtual returns (uint amountA, uint amountB) {
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
    }

   // REMOVEL LIQUIDITY AND WITHDRAW ETH
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }


}
    interface IERC20{
        function transferFrom(address sender, address recipient,uint256 amount )

    }
  


  
  contract MyDefiProject{
     IUniswap uniswap;

     constructor (address _uniswap){
       uniswap = IUniswap(_uniswap);
     }

  function swapTokensForEth( 
    address token, uint amountIn, uint amountOutMin,
    uint deadline) external {
  
  IERC20(token).transferFrom(msg.sender, address(this), amountIn)
 
 // address of the two tokens, wonder why they call it path
  address[] memory path = new address[](2);
  path[0] = token;
  path[1] = uniswap.WETH();
  IERC20(token).approve(address(uniswap), amountIn);
  uniswap.swapExactTokensForEth(amountIn, amountOutMin, path, msg.sender, deadline);
  // removing liquidity

  address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline


 address token, uint amountIn, uint amountOutMin,
    uint deadline
    uint 

  uniswap.removeLiquidity(token, ) }

    
    }