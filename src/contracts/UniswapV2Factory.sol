//pragma solidity ^0.5.5;
pragma solidity >=0.4.16 <0.9.0;
import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
       // LIST OF ALL THE PAIRS GIVEN OUT 
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
          // FOR MINTED TOKENS AND THE TOTAL SUPPLIED GIVEN OUT, 
          // WE PAIR THEM HERE RATHER THAN THE WAY THE PAIRING IS DONE IN OTHE MEANS
          // THIS IS THE FULL IMPLEMENTATION OF THE PAIRING
          //WE CREATE THE PAIRS AND CREATE THE COST OF TRANSFERS

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
         // Under the uniswap side library these are rendered token 0 and 1
         // We make sure they are in the right order
         
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
          // WE SET THE FEE CHARGES TO WHOEVER IS ADDRESS RECEIVING THE FEE
          // THIS IS TO SET THE FEES FOR THE POOL AND THE TRANSACTIONS PAYMENT, WELL COULD BE OTHER
          //PAYMENT YET TO CONFIRM
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }
         // WE SET THE FEES OF THE PERSON WE ARE SETTING THE ADDRESS TO 
    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
