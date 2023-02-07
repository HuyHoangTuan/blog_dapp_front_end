import Web3 from "web3";
import { getAccounts } from "./Utilities";

var contract = null;
var fees = null;
var smartContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export function getBlogItemContract()
{
      if(contract == null)
      {
            let abi = require('../abi/BlogItem.json').abi;
            let address = smartContractAddress;
            let host = 'http://127.0.0.1:8545';
            let web3 = new Web3(host);
            contract = new web3.eth.Contract(abi, address);
      }
      
      return contract;
}

export async function getFees()
{
      if (fees == null)
      {
            let contract = getBlogItemContract();
            fees = await contract.methods.getFees().call();
      }
      return fees;
}

export async function publishBlog(account, ipfsHashAddress)
{
      const {ethereum} = window;
      let fees = await getFees();
      let gas = 3000000;
      let contract = getBlogItemContract();
      
      let encodedABI = contract.methods.publicBlog(account, ipfsHashAddress).encodeABI();
      let params = [
            {
                  from: getAccounts()[0],
                  to: smartContractAddress,
                  value: "0x"+fees.toString(16),
                  gas: "0x"+gas.toString(16),
                  data: encodedABI
            }
      ]
      ethereum.request(
            {
                  method: "eth_sendTransaction",
                  params: params
            }
      ).then((response) => {
            console.log(response);
      }).catch((error) => {
            console.log(error);
      })
}

export async function getListUriOfAddress(account)
{
      const {ethereum} = window;
      let gas = 3000000;
      let contract = getBlogItemContract();
      contract.methods.getListUriOfAddress(account).call({from: account, gas: gas}).then((list) => {
            console.log(list);
      }).catch((err) => {console.log(err)});
}
