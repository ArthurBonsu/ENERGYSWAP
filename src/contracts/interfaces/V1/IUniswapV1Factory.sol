//pragma solidity ^0.5.5;
pragma solidity >=0.4.16 <0.9.0;
interface IUniswapV1Factory {
    function getExchange(address) external view returns (address);
}
