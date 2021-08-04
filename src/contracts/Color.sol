//pragma solidity ^0.5.5;
pragma solidity >=0.4.16 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

abstract contract Color is ERC721Full {
  string[] public colors;
  mapping(string => bool) _colorExists;
 string thename;
 string thesymbol;
  constructor() ERC721Full("Color", "COLOR") public {
     thename = name();
     thesymbol =  symbol();
   }
  
  // E.G. color = "#FFFFFF"
  function mint(string memory _color) public  {
    require(!_colorExists[_color]);
    uint _id = colors.push(_color);
   uint tokenid = tokenURI(_id);

    _mint(msg.sender, _id);
    _colorExists[_color] = true;
  }

}
