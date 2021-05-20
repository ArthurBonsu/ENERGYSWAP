//pragma solidity ^0.5.5;
pragma solidity >=0.4.16 <0.9.0;
interface IUniswapV2Migrator {
    function migrate(address token, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external;
}
