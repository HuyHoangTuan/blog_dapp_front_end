import Web3 from "web3";
import { getAccounts } from "./Utilities";

var contract = null;
var fees = null;
var testNetSmartContractAddress = '0xd248A0e120ecd4899eaf999Bf3c36Ff688fd914d';
// var smartContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
var smartContractAddress = testNetSmartContractAddress;
var GAS_LIMIT = 3000000;


export function getBlogItemContract()
{
      if(contract == null)
      {
            let abi = require('../abi/BlogItem.json').abi;
            let address = smartContractAddress;
            let host = 'https://eth-goerli.g.alchemy.com/v2/0drTashIXwsB5eKpvK72nHrfdQf_nHbK';
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
            console.log(`Fees: ${fees}`);
      }
      return fees;
}

export async function publishBlog(ipfsHashAddress)
{
      const {ethereum} = window;
      let fees = await getFees();
      let gas = GAS_LIMIT;
      let contract = getBlogItemContract();
      
      let encodedABI = contract.methods.publicBlog(ipfsHashAddress).encodeABI();
      let params = [
            {
                  from: getAccounts()[0],
                  to: smartContractAddress,
                  value: "0x"+fees.toString(16),
                  gas: "0x"+gas.toString(16),
                  data: encodedABI
            }
      ];

      let res = await ethereum.request(
            {
                  method: "eth_sendTransaction",
                  params: params
            }
      );
      console.log(`public: ${res}`);
}

export async function getListUriOfAddress(account)
{
      let gas = GAS_LIMIT;
      let contract = getBlogItemContract();
      let res = await contract.methods.getListUriOfAddress(account).call({from: getAccounts()[0], gas: gas});
      console.log(`List URI of address: ${account} --  ${res}`);
}

export async function editBlog(old_ipfsHashAddress, new_ipfsHashAddres)
{
      const {ethereum} = window;
      let fees = await getFees();
      let gas = GAS_LIMIT;
      let contract = getBlogItemContract();

      let encodedABI = contract.methods.editBlog(old_ipfsHashAddress, new_ipfsHashAddres).encodeABI();
      let params = [
            {
                  from: getAccounts()[0],
                  to: smartContractAddress,
                  value: "0x"+fees.toString(16),
                  gas: "0x"+gas.toString(16),
                  data: encodedABI
            }
      ];

      let res = await ethereum.request(
            {
                  method: "eth_sendTransaction",
                  params: params
            }
      );
      console.log(`edit: ${res}`);
}     

export async function giveMedalTo(ipfsHashAddress)
{
      const {ethereum} = window;
      let fees = await getFees();
      let gas = GAS_LIMIT;
      let contract = getBlogItemContract();

      let encodedABI = contract.methods.giveMedalToABlog(ipfsHashAddress).encodeABI();
      let params = [
            {
                  from: getAccounts()[0],
                  to: smartContractAddress,
                  value: "0x"+fees.toString(16),
                  gas: "0x"+gas.toString(16),
                  data: encodedABI
            }
      ];

      let res = await ethereum.request(
            {
                  method: "eth_sendTransaction",
                  params: params
            }
      );
      console.log(`give medal: ${res}`);
}

export async function getMedalOf(ipfsHashAddress)
{
      let gas = GAS_LIMIT;
      let contract = getBlogItemContract();
      let res = await contract.methods.getMedalOfUri(ipfsHashAddress).call({from: getAccounts()[0], gas: gas});
      console.log(`Get meadl: ${res}`);
}

export async function getAllPublishedBlogs()
{
      let gas = GAS_LIMIT;
      let contract = getBlogItemContract();
      let res = await contract.methods.getAllPublishedUri().call({from: getAccounts()[0], gas: gas});
      console.log(`All published blogs: ${res}`);
}