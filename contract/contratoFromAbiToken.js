const Web3 = require("web3");

const provider ="https://eth-mainnet.g.alchemy.com/v2/LlNcOonosHij2PiE8TdwutxYZtKvVfGV" // api key quick node actual

const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));


var contractABI = [{
  "constant": true,
  "inputs": [],
  "name": "name",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}];

  var contractAddress = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84';
  var contract = new Web3Client.eth.Contract(contractABI, contractAddress);
  // Llama al método name() del contrato
  contract.methods.name().call((err, name) => {
    if (err) {
      // Maneja el error
      console.error(err);
    } else {
      // Muestra el nombre del token
      console.log(name);
    }
  });


