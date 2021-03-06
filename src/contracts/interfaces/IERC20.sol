//pragma solidity ^0.5.5;
pragma solidity >=0.4.16 <0.9.0;
interface IERC20 {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    function name() external  view returns (bytes32);
    function symbol() external  view returns (bytes32);
   // function decimals() external  view returns (uint8);
   function decimals() external  view returns (uint256);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint value) external  returns (bool);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);
}
