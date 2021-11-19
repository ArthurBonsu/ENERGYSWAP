//pragma solidity ^0.5.5;
pragma solidity >=0.4.16 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

abstract contract Energy is ERC721Full {
  string[] public energytypetokens;
  mapping(string => bool) energytypexist;
 string thename;
 string thesymbol;
  constructor() ERC721Full("EnergyTokens", "ENGS") public {
     thename = name();
     thesymbol =  symbol();
   }
  
  // E.G. color = "#FFFFFF"
  function mint(string memory energytoken) public  {
    require(!energytypexist[energytoken]);
    uint _id = energytypetokens.push(energytoken);
   uint tokenid = tokenURI(_id);

    _mint(msg.sender, _id);
    energytypexist[energytoken] = true;
  }

}
