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
abstract contract  FullEnergyTokens is ERC721Full, Ownable {
  address payable public _owner;
  mapping (uint => bool) public sold;
  mapping (uint => uint) public price;

  event Purchase(address owner, uint price, uint id, string uri);
   
  constructor() ERC721FullEnergyTokens("EnergyUnitTokens", "EUT")  public{
  	_owner = msg.sender;
  } 
  

  function mint(string memory _tokenURI, uint _price) public onlyOwner returns (bool) {
    
    //DIFFERENT FROM ERC20 , ERC721 IS RATHER INCREMENT 
    // WE WILL BUILT THE NFTS FROM HERE
    // SO YOU DONT HAVE A SUPPLY OF LET'S SAY 200
    //YOU HAVE A SUPPLY OF LET' SAY  0 AND YOU INCREMENT TO LET'S SAY 1
    //TOTAL SUPPLY IS THEREFORE 1 AS THE TOKEN IS MINTED AND IDD
    uint _energytokenId = totalSupply() + 1;
   
    //set the price of the token id
    price[_energytokenId] = _price;

    _mint(address(this), _energytokenId);
    _setTokenURI(_energytokenId, _tokenURI);
    
    return true;
  }

  function buy(uint _energyunittokensid) public payable {
    _validate(_energyunittokensid); //check req. for trade
    _trade(_energyunittokensid); //swap nft for eth
  //   string memory _thetokenURI = tokenURI(_energyunittokensid);
    emit Purchase(msg.sender, price[_energyunittokensid], _energyunittokensid, ERC721Metadata.tokenURI(_energyunittokensid));
  }

  function _validate(uint _energyunittokensid) public payable {
  	require(ERC721Full._exists(_energyunittokensid), "Error, wrong Token id"); //not exists
    require(!sold[_energyunittokensid], "Error, Token is sold"); //already sold
    require(msg.value >= price[_energyunittokensid], "Error, Token costs more"); //costs more
  }

  function _trade(uint _energyunittokensid) public payable  {
    
    // transfer from ERC721
  	transferFrom(address(this), msg.sender, FullEnergyTokens.sol); //nft to user

        
  	_owner.transfer(msg.value); //eth to owner
  	sold[_energyunittokensid] = true; //energy tokens is sold
  }
}
