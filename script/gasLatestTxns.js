const Web3 = require("web3");
const path = require('path')
const fs = require('fs/promises');
var nodemailer = require("nodemailer");

// api key de ether scam UMZRWEM7JDP5N1IHMWSNWNMSEIMDFUZU8V
// obtener nombre de los contratos que arroja messari, trabajar con el block pending para las alertas sin mostrar logs, colocar 
// la url de etherscan con el hash de la txn y un msj advirtiendo que no puede aperecer aun. ej: https://etherscan.io/tx/0x4ddf3a6a5905ec1dfd591f8cdd83be519cf7f7afe61027cd54a71700500b3e3f
const provider ="https://eth-mainnet.g.alchemy.com/v2/LlNcOonosHij2PiE8TdwutxYZtKvVfGV" // api key quick node actual
const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

time= 6000;
// setInterval(() => newTxns(), time);

latestTxns()
async function latestTxns(){
    var txnsReceipt=[];
    let sender= false;
    latestBlock = await Web3Client.eth.getBlock('latest', true);
    for(let i = 0 ;i < latestBlock['transactions'].length;i++){
        const element = latestBlock['transactions'][i];
       console.log(element['hash']); 
       console.log("-----------------------");
       if (element['gas'] > 100000){
        sender= true;
         console.log('txn con gas mayor a 100000. valor de gas de la txn: '+element['gas'])
         console.log(element['hash']);
         const object ={
            txnHash: element['hash'],
            txnFrom: element['from'],
            txnTo: element['to'],
            txnGas: element['gas'],
            txnValue: element['value'],
            txnType:element['type'],
            // logs: txnReceipt.logs
         }

         txnsReceipt.push(object) 
         
       }
    }
   
    // console.log(txnsReceipt)
    if (sender) {
        try{
            console.log("sender equal true")
            fileName = path.join(__dirname, 'receiptTnxs.json')
            await fs.writeFile(fileName,JSON.stringify(txnsReceipt));
            sendEmail();
        } catch (error) {
            console.error(`Got an error : ${error.message}`);
        }
    }

   
}


