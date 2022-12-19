const { Network, Alchemy }=require("alchemy-sdk"); 
const fs = require("fs");
const Web3 = require("web3");
const util = require("../utils/utilsTools")


const provider ="https://eth-mainnet.g.alchemy.com/v2/LlNcOonosHij2PiE8TdwutxYZtKvVfGV" // api key quick node actual
const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));


dir = '../fileJson/createPoolsUniswap.json'
dirToken = '../fileJson/tokenMetadataMessari.json'
dirTokenTest = '../fileJson/fileOftest/tokenMetadataMessari2.json'

const settings = {
    apiKey: "LlNcOonosHij2PiE8TdwutxYZtKvVfGV", // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  const alchemy = new Alchemy(settings);

// getPoolsUniswap()

async function getPoolsUniswap(){
    var logsContracts= await alchemy.core.getLogs({
        fromBlock: "pending",
        toBlock: "pending"
        })
    
    console.log(logsContracts)
}

async function createFilterLogs(){
    const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'eth_newFilter',
          params: [
            {
              address: ['0x1F98431c8aD98523631AE4a59f267346ea31F984'],
              fromBlock: 'earliest',
              toBlock: 'latest'
            }
          ]
        })
      };
      
     var id= await fetch('https://eth-mainnet.g.alchemy.com/v2/LlNcOonosHij2PiE8TdwutxYZtKvVfGV', options)
        .then(response => response.json())
        // .then(response => console.log(response))
        // .catch(err => console.error(err));

      return id['result']
        // id filtro: '0x249eff63424f2b298c9fa3664344b2c2
}



// getFilterLogs() funcion para llamar todas las txns que se incluyen en el contrato factory uniswap
async function getFilterLogs(){

    var x = await createFilterLogs();
    console.log(x)
    const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          params: [x],
          method: 'eth_getFilterLogs'
        })
      };
      
    var poolsUniswap= await fetch('https://eth-mainnet.g.alchemy.com/v2/LlNcOonosHij2PiE8TdwutxYZtKvVfGV', options)
        .then(response => response.json())
    jsonString = JSON.stringify(poolsUniswap['result']);
    fs.writeFileSync(dir, jsonString, 'utf8');  
}


// funcion para verificar unicamente los contratos que pertenecen a la creacion de un pool 
// con el identificador de funcion 0x783cca1c

checkPoolCreator()
async function checkPoolCreator(){
   var jsonUniswap= util.readJson(dir)
   var jsonToken = util.readJson(dirToken)
   const addressToken = jsonToken.map(object => ({
    address: object.address,
    symbol: object.symbol
  }) );
  console.log(jsonUniswap.length)
  // jsonUniswap.length= 9563 2709-2750 presento error revisar cuando termine de almacenar la totalidad de los datos
  // quedo en 3341
  for (let j = 3263; j <= 3400; j+=40) {
    var1= j + 40;
      for (let i = j; i < var1; i++) {
        console.log(i)
        const element = jsonUniswap[i];
        if (element['topics'][0].substring(0, 10) === '0x783cca1c') {
          var tokenA = null
          var tokenB = null
          const filteredDataTopic1 = addressToken.filter(item => item.address === '0x'+element['topics'][1].slice(-40));
          const filteredDataTopic2 = addressToken.filter(item => item.address === '0x'+element['topics'][2].slice(-40));
          if (filteredDataTopic1.length !== 0 ) {
            tokenA = filteredDataTopic1[0]['symbol']
          }else{
            var topic1A = await alchemy.core.getTokenMetadata('0x'+element['topics'][1].slice(-40));
            tokenA = topic1A['symbol']
            // console.log(topic1A['symbol'])
          }
          if (filteredDataTopic2.length !== 0 ) {
            tokenB = filteredDataTopic2[0]['symbol']
          }else{
            var topic2A = await alchemy.core.getTokenMetadata('0x'+element['topics'][2].slice(-40));
            tokenB = topic2A['symbol']
            // console.log(topic2A)
          }
          if (tokenA !== null & tokenB !== null) {
            element.poolName= tokenA+'-'+tokenB
          }
          element.contract = '0x'+element['data'].slice(-40)
        } 
        
        // console.log(element)
      }

      jsonString = JSON.stringify(jsonUniswap);
      fs.writeFileSync(dirTokenTest, jsonString, 'utf8');
  }


  

  

}


// el topic cero se compara con 0x783cca1c si coincide toma  tokenA y token B son los nombres con que se guardaran
// tokenA(Topic[1]), tokenB(topic[2]), en la variable data exiten dos hashes de 256 el contrato se encuentra despues
// de los caracteres 3c para guarda el hash de contrato solo tomar los numeros desde el ultimo cero ejmplo:
// "data":"0x000000000000000000000000000000000000000000000000000000000000003c000000000000000000000000{e8c6c9227491c0a8156a0106a0204d881bb7e531}
//  el tokenA y tokenB se compara con la lista de los address de contracto que se encuentran en el archivo tokenmetadatamesarri
// si son iguales guardar el nombre
// añadir el symbol de createpoolsUniswap  al archivo createpoolsUniswap con el nombre de poolName= tokenA&tokenB(usdc-usdt)
// si  el tokenA y tokenB no esta en ese archivo buscarlo por medio de getmetadata y añadirlo