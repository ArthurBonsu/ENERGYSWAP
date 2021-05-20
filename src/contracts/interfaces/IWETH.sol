//pragma solidity ^0.5.5;
pragma solidity >=0.4.16 <0.9.0;
interface IWETH {
    function deposit() external payable;
    function transfer(address to, uint value) external returns (bool);
    function withdraw(uint) external;
}
