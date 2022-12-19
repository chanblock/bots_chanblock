// npm install mongodb@4.12
// npm install alchemy-sdk
// guardar en un file todos las adrress de mesarri que se llamen ethereum y compararlas con la consulta

const { Network, Alchemy }=require("alchemy-sdk"); 
const { utils } = require("ethers");
const fs = require("fs");
const util = require('../utils/utilsTools')

const diraddresesEth = "../fileJson/addressesEth.json"
const dir= "../fileJson/tokenMetadataMessari.json"
// Optional config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "LlNcOonosHij2PiE8TdwutxYZtKvVfGV", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

async function queryAlchemyMetadata(){
    var arrayAddres=[]
    let dataEth = util.readJson(diraddresesEth)    

    if (fs.existsSync(dir)) {
        var data = util.readJson(dir)
        console.log(data.length)
        for (let j = 800; j <= 960; j+=40) {
         var1= j + 40;
            for (let i = j; i <= var1; i++) {
               
                aux={}
                const element = dataEth[i];  
                console.log(i) 
                var query = await alchemy.core.getTokenMetadata(element['address']);
                element.decimal = query['decimals']
                arrayAddres.push(element)
                  
            }
            const mergedList = data.concat(arrayAddres)
            var jsonString = JSON.stringify(mergedList);
            fs.writeFileSync(dir, jsonString, 'utf8'); 
        }
       
    }else{
        for (let j = 0; j <= 160; j+=40) {
            var1= j + 40;        
            for (let i = j; i < var1; i++) {
                console.log(i)
                const element = dataEth[i];   
                var query = await alchemy.core.getTokenMetadata(element['address']);
                var decimal = query['decimals']
                element.decimal = decimal
                arrayAddres.push(element)
                // console.log(element['address'])
            }
        }   
        const jsonString = JSON.stringify(arrayAddres);
        fs.writeFileSync(dir, jsonString, 'utf8');
    }
}
queryAlchemyMetadata()















