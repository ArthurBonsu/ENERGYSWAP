// SPDX-License-Identifier: MIT
//pragma solidity >=0.6.0 <0.8.0;
//pragma solidity ^0.5.5;
pragma solidity >=0.4.16 <0.9.0;
//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721Enumerable.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721MetadataMintable.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

//Conversion of Energy Tokens Here
abstract contract  NFT is ERC721Full, Ownable {
  address payable public _owner;
  mapping (uint => bool) public sold;
  mapping (uint => uint) public price;

  event Purchase(address owner, uint price, uint id, string uri);
   
  constructor() ERC721Full("ArthurNFT", "ANFT")  public{
  	_owner = msg.sender;
  } 
  

  function mint(string memory _tokenURI, uint _price) public onlyOwner returns (bool) {
    
    //DIFFERENT FROM ERC20 , ERC721 IS RATHER INCREMENT 
    // SO YOU DONT HAVE A SUPPLY OF LET'S SAY 200
    //YOU HAVE A SUPPLY OF LET' SAY  0 AND YOU INCREMENT TO LET'S SAY 1
    //TOTAL SUPPLY IS THEREFORE 1 AS THE TOKEN IS MINTED AND IDD
    uint _tokenId = totalSupply() + 1;
   
    //set the price of the token id
    price[_tokenId] = _price;

    _mint(address(this), _tokenId);
    _setTokenURI(_tokenId, _tokenURI);
    
    return true;
  }

  function buy(uint _id) public payable {
    _validate(_id); //check req. for trade
    _trade(_id); //swap nft for eth
  //   string memory _thetokenURI = tokenURI(_id);
    emit Purchase(msg.sender, price[_id], _id, ERC721Metadata.tokenURI(_id));
  }

  function _validate(uint _id) public payable {
  	require(ERC721Full._exists(_id), "Error, wrong Token id"); //not exists
    require(!sold[_id], "Error, Token is sold"); //already sold
    require(msg.value >= price[_id], "Error, Token costs more"); //costs more
  }

  function _trade(uint _id) public payable  {
    
    // transfer from ERC721
  	transferFrom(address(this), msg.sender, _id); //nft to user

        
  	_owner.transfer(msg.value); //eth to owner
  	sold[_id] = true; //nft is sold
  }
}
