
// npm install mongodb@4.12
// npm install alchemy-sdk
// guardar en un file todos las adrress de mesarri que se llamen ethereum y compararlas con la consulta

// 14.12.22 la variable decimal de la consulta metadata se guarda 
// terminar de crear el archivo con los address que sean contractos function contractTopic0xddf252ad
// realizar consultas metada para los constractos del file addressesEth.json incluir variable decimal
// para mañana buscar la forma de realizar consulta del abi 
// usar api https://www.4byte.directory/docs/ para obtener el nombre de la funcion del topic0 

const { Network, Alchemy }=require("alchemy-sdk"); 
const fs = require("fs");
const { parse } = require("csv-parse");
const utils = require('../utils/utilsTools')



const dir= "../fileJson/addressesEth.json";
const dirNameContract= "../fileJson/nameContract.json"
const dirContract0xddf252ad = "../fileJson/contract0xddf252ad.json"
const dirTopic = "../fileJson/topics.json"

const settings = {
  apiKey: "LlNcOonosHij2PiE8TdwutxYZtKvVfGV", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

logsPending()

async function logsPending(){
  var namesContract=[]
  var contract0xddf252ad= []
  var topics0xddf252ad=[]
  var logsContracts= await alchemy.core.getLogs({
    fromBlock: "pending",
    toBlock: "pending"
    })

    // Use the Array.map() method to transform the data
    const transformedData = logsContracts.map(item => ({
      address: item.address,
    }));

     // Read the contents of the file into a variable
    const list_contract_addresses = fs.readFileSync(dir, 'utf-8');
    // Use the JSON.parse() method to convert the JSON string into a JavaScript object
    const data = JSON.parse(list_contract_addresses);
    const transformedFile = data.map(item => ({
      address:item.address,
      name:item.name
    }));
    
    for (let i = 0; i < logsContracts.length; i++) {
      const aux={}
      const aux0xddf252ad={}
      const auxTopic={}
      var elementPending = logsContracts[i]['address'];

      // almacena los topics de la consulta
      auxTopic.topic=logsContracts[i]['topics'][0];
      topics0xddf252ad.push(auxTopic)

      const filteredData = transformedFile.filter(item => item.address === elementPending.toLowerCase());
      if (filteredData.length !== 0) {
        console.log(filteredData)
      }else{    
        aux.address= elementPending
        namesContract.push(aux)
        if (logsContracts[i]['topics'][0].substring(0, 10) === '0xddf252ad') {
          aux0xddf252ad.address=elementPending;
          contract0xddf252ad.push(aux0xddf252ad)
     
        }
        
      }
  
    }
    // var listContract0xddf252ad= 
    // console.log(topics0xddf252ad)
    // var listTopics = utils.listWithoutRepeatsTopic(topics0xddf252ad)
    // console.log(listTopics)
    // storeTopic(listTopics)

    // function to contract type 0xddf252ad
    contractTopic0xddf252ad(contract0xddf252ad)
  

    // newNameContract(namesContract);
 
}


function newNameContract(array){
  const listWithoutRepeats = utils.listWithoutRepeatsContract(array);

  if (fs.existsSync(dirNameContract)) {
    console.log('dentro de if existen archivo')
    // Primero, leemos el contenido del archivo JSON
    let jsonString = fs.readFileSync(dirNameContract, 'utf8');
    console.log(jsonString)
    // Convertimos la cadena JSON en un objeto JavaScript
    let data = JSON.parse(jsonString);
    var arrayAddres=[]
    for (let i = 0; i < listWithoutRepeats.length; i++) {
      const aux={}
      const element = listWithoutRepeats[i];
      aux.address= element['address']
      arrayAddres.push(aux)
      // console.log(element['address'])     
    }
    console.log(data);
    const mergedList = data.concat(arrayAddres).filter((item, index, array) => {
      return array.indexOf(item) === index;
    });
    console.log(mergedList)
    jsonString = JSON.stringify(mergedList);
    fs.writeFileSync(dirNameContract, jsonString, 'utf8');
  }else{
  const listWithoutRepeats = utils.listWithoutRepeatsContract(array);
    const jsonString = JSON.stringify(listWithoutRepeats);
    // write the JSON string to the file
    fs.writeFile(dirNameContract, jsonString, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Array saved to file: ${dirNameContract}`);
      }
    });
  }

}


function contractTopic0xddf252ad(array){
    var listContract = utils.listWithoutRepeatsContract(array)
    // console.log(listContract)
    if (fs.existsSync(dirContract0xddf252ad)) {
      console.log('dentro de if existen archivo')
      // Primero, leemos el contenido del archivo JSON
      let jsonString = fs.readFileSync(dirContract0xddf252ad, 'utf8');
      console.log(jsonString)
      // Convertimos la cadena JSON en un objeto JavaScript
      let data = JSON.parse(jsonString);
      var arrayAddres=[]
      for (let i = 0; i < listContract.length; i++) {
        const aux={}
        const element = listContract[i];
        aux.address= element['address']
        arrayAddres.push(aux)
        console.log(element['address'])     
      }
      console.log(data);
      const mergedList = data.concat(arrayAddres).filter((item, index, array) => {
        return array.indexOf(item) === index;
      });
      console.log(mergedList)
      // Convertimos el objeto de nuevo en una cadena de texto en formato JSON
      jsonString = JSON.stringify(mergedList);
      // Guardamos la cadena JSON en el archivo
      fs.writeFileSync(dirContract0xddf252ad, jsonString, 'utf8');
    }else{
      const listWithoutRepeats = utils.listWithoutRepeatsContract(array);
      const jsonString = JSON.stringify(listWithoutRepeats);
      // write the JSON string to the file
      fs.writeFile(dirContract0xddf252ad, jsonString, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Array saved to file: ${dirContract0xddf252ad}`);
        }
      });
    }
}

function storeTopic(listTopics){
  if (fs.existsSync(dirTopic)) {
    console.log('existen archivo')
    // Primero, leemos el contenido del archivo JSON
    let jsonString = fs.readFileSync(dirTopic, 'utf8');
    console.log(jsonString)
    // Convertimos la cadena JSON en un objeto JavaScript
    let data = JSON.parse(jsonString);
    var arrayTopics=[]
    for (let i = 0; i < listTopics.length; i++) {
      const aux={}
      const element = listTopics[i];
      aux.topic= element['topic']
      arrayTopics.push(aux)
      // console.log(element['topic'])     
    }
    console.log(data);

    // const merge = data.concat(arrayAddres)
    // console.log(merge)

    const mergedList = data.concat(arrayTopics).filter((item, index, array) => {
      return array.indexOf(item) === index;
    });
    console.log(mergedList)
    // // Convertimos el objeto de nuevo en una cadena de texto en formato JSON
    jsonString = JSON.stringify(mergedList);
    // // Guardamos la cadena JSON en el archivo
    fs.writeFileSync(dirTopic, jsonString, 'utf8');
  }else{
    const jsonString = JSON.stringify(listTopics);
    // write the JSON string to the file
    fs.writeFile(dirTopic, jsonString, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Array saved to file: ${dirTopic}`);
      }
    });
  }
}



