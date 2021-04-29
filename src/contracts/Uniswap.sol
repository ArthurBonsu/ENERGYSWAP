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
  }

    
    }