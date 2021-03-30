const { assert } = require('chai')

const Color = artifacts.require('./Color.sol')

require('chai')
 .use(require('chai-as-promised'))
 .should()


 contract('Color', (accounts) =>{

let contract
before(async() =>{
contract = await Color.deployed();

})
describe('deployment', async()=>{
it('deploys successfully', async()=>{
 // contract  = await Color.deployed();
  const address = contract.address;
   console.log(address);
   assert.notEqual(address, 0x0)
   assert.notEqual(address, '')
   assert.notEqual(address, null)
   assert.notEqual(address, undefined)

})


it('it has an address to', async()=>{
//  contract  = await Color.deployed();
  const address = contract.address;
   console.log(address + 'It has an address too bro!');
   assert.notEqual(address, 0x0)
   
})
 let name
it('it has a name', async()=>{
 // contract  = await Color.deployed();
  name = await contract.name()
   const address = contract.address;
   console.log(address + 'Yo! What is my name!');
   assert.notEqual(address, 'kwa')
     console.log('The address is not Ghanaian')   
})

it('it creates a new token', async()=>{
 // contract  = await Color.deployed();
  const result = await contract.mint('#EC058E')
   const totalsupply  = await contract.totalSupply();
    // SUPPLY
   assert.equal(totalsupply, 1)
  console.log(result);
   assert.equal(totalsupply, 1);
   const event = result.logs[0].args
   assert.equal(event.tokenId.toNumber(), 1, 'id is correct') 
   assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is unique ') 
   assert.equal(event.to, accounts[0], 'to is correct') 
       
   /* We try to ensure that the minted coin is not minted again and 
   *that is where we force a rejection  to be invoked in case it has
   * occured already in execution already. The code also provides that
   * frameworks to be built*/
   const rejectioninformation =   await contract.mint('#EC058E').should.be.rejected;
  console.log(rejectioninformation, 'this information is to show that the mint is unique')
})

 it('has a symbol', async()=>{
const symbol = await contract.symbol()
 assert.equal(symbol, 'COLOR')

 })


 })
  describe('indexing', async()=>{
      let result, totalSupply
    
      it('lists colors', async()=>{
         // Mint 3 tokens //so we mint a lot
            await contract.mint('#5386E4') 
            await contract.mint('#FFFFFF')
            await contract.mint('#000000')
            const totalSupply =  await contract.totalSupply()
             
              let color  
              let result = []
              for (var i = 1; i <= totalSupply; i++) {
                
                /* So go through the color box and pull each one, 
                *go through the color array box and push each one
                the minted coin to the color box/array*/ 
                color = await contract.colors(i-1)
                // push content to the result
                result.push(color)

                }
                  //We compare the arrays that we have [expected] to the minted coin in colours[result]
              let expected = ['#EC058E','#5386E4', '#FFFFFF', '#000000' ]
              assert.equal(result.join(','), expected.join(',') )

            } )
      //STORED THESE HERE, SORT OF USED FOR DOING SOLIDITY DIRECTORIES
      // "solidity.packageDefaultDependenciesDirectory" :  "node_modules",
 // "solidity.packageDefaultDependenciesContractsDirectory" : "contracts",

  })


})
