pragma solidity ^0.5.5;

import '../libraries/UniswapV2LiquidityMathLibrary.sol';
import '../libraries/UniswapV2Library.sol';
import '../libraries/UniswapV2OracleLibrary.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol';

import '../libraries/UniswapV2Library.sol';
import '../interfaces/V1/IUniswapV1Factory.sol';
import '../interfaces/V1/IUniswapV1Exchange.sol';
import '../interfaces/IUniswapV2Router01.sol';
import '../interfaces/IERC20.sol';
import '../interfaces/IWETH.sol';



interface IUniswap{
    function swapExactTokensForEth(
    uint amountIn,
    uint amountOutMin,
    address[] calldata path,
    address to, uint deadline)
    external
    ensure(deadline) returns (uint[] memory amounts);

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
}
    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }

     // given an output amount of an asset and pair reserves, returns a required input amount of the other asset
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
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


}
    interface IERC20{
        function transferFrom(address sender, address recipient,uint256 amount )

    }
  
   interface IWETH{

     function deposit() external payable;
     function transfer(address to, uint value) external returns (bool);
     function withdraw(uint) external;
   }

  // UniswapFactorymustbegiven here

  contract MyDefiProject is IERC20, IUniswapV2Callee, IWETH, IUniswapV2Router02  {
      
    address public factory;
    factory = msg.sender;
      
    address public token0;
    address public token1;
      
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
    uint32  private blockTimestampLast;
   //SWAPPING TOKENS HERE

     constructor (address _uniswap) IUniswapV1Factory(factory) { 
       uniswap = IUniswap(_uniswap);
     }
   
  

function fullswapprocessandswaptokenforeth(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {   
          
       // IUniswapV1Factory.createPair();
        // SORT TOKENS
        //UniswapV2Library.sortTokens();
        // GET PAIRS
        //address token0 = IUniswapV2Pair(msg.sender).token0();
        //address token1 = IUniswapV2Pair(msg.sender).token1();
         // cREATE A SINGLE TOKEN PAIR
        

        // address of the two tokens, wonder why they call it path
        address[] memory path = new address[](2);
         // Set the pairs given
        path[0] =  IWETH.WETH();
        path[1] = token;        
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
         (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
         assert(IWETH(WETH).transferFrom(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
         IERC20(IWETH(WETH)).approve();     
        _swap(amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);

    }

      function gettokenpairaddress(address token0_, address token1_ ) external return (address pair){


      }
   function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
        
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IUniswapV2Pair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }


    // SWAP AND WTHDRAW
    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


  function swapTokensForEth( 
    address token, uint amountIn, uint amountOutMin,
    uint deadline) external {
  
  IERC20(token).transferFrom(msg.sender, address(this), amountIn)
 
 // address of the tokens and eth, wonder why they call it path
  address[] memory path = new address[](2);
  path[0] = token;
  path[1] = uniswap.WETH();
  //HAVE TO GET THE FACTORY INFORMATION



  uint amountIn = uniswap.getReserves();
  uint amountOutMin =  

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
    uint amountIn,
    uint amountOutMin 
    uint amountETHMin
    
     uint _getreserves = uniswap.getReserves(address factory, address tokenA, address tokenB)
    uint _amountIn = uniswap.getAmountIn()

  uniswap.removeLiquidity(token, ) }

    
    }