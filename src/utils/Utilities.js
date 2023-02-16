
import * as IPFS from 'ipfs-core';
import { Buffer } from 'buffer';
import { getBlogItemContract, getFees, publishBlog } from './Abi';
// const node_ipfs = await IPFS.create();
var node_ipfs = null;

export async function _getNodeIPFS() {
    if (node_ipfs == null) {
        // console.log("test1: abc");
        node_ipfs = await IPFS.create();
    }
    return node_ipfs;
}

export function isLogedIn() {
    // todo: check function
    let accounts = [];
    if (sessionStorage.getItem("accounts") != null) {
        accounts = JSON.parse(sessionStorage.getItem("accounts"));
    }
    console.log("connected accounts: " + JSON.stringify(accounts));
    return accounts.length > 0;
}

export function logIn(accounts)
{
    console.log("cached accounts: "+JSON.stringify(accounts));
    sessionStorage.setItem("accounts", JSON.stringify(accounts));
}

export function logOut()
{
    sessionStorage.removeItem("accounts");
}

export function getAccounts() {
    let accounts = [];
    if (sessionStorage.getItem("accounts") != null) {
        accounts = JSON.parse(sessionStorage.getItem("accounts"));
    }
    if (accounts == null) accounts = [];
    return accounts;
}

export function log(...str) {
    let output = "";
    str.forEach((element) => {
        output += JSON.stringify(element) + " ";
    });
    console.log("LOG: " + output);
}

export function isMetaMaskInstalled() {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
        return true;
    }
    return false;
}
export function isLoading() {
    return (
        <div classname="Loading">
            hello
        </div>
    )
}

export function makeIPFSData({ title, content, owner, posted_time, hidden, image = null }) {
    let data = {
        title: title,
        content: content,
        // num_medals: num_medals,
        owner: owner,
        posted_time: posted_time,
        hidden: false,
        image: image
    }
    console.log("makeIPFSData", data);
    return encodeData(JSON.stringify(data));
}

export function encodeData(data) {
    return data;
}

export function decodeData(encodedData) {
    return encodedData;
}

export async function addFileToIPFS(filePath, content, warpWithDirectory = true) {
    let node = await _getNodeIPFS();
    let options = {
        warpWithDirectory: warpWithDirectory
    }
    let result = await node.add(
        {
            path: filePath,
            content: content
        },
        options
    );
    return result;
}

export async function retrieveConternFromIPFS(hashAddress) {
    let data = "";
    let node = await _getNodeIPFS();
    for await (let chunk of node.cat(hashAddress)) {
        data = data + Buffer.from(chunk).toString();
    }
    //// console.log("test1: " + data);
    let jsonData = JSON.parse(decodeData(data));
    // if (jsonData.title == null || jsonData.owner == null ||
    //     jsonData.hidden == null || jsonData.content == null ||
    //     jsonData.posted_time == null) return null;
    if(!checkDataIsValid(jsonData)) return null;
    return jsonData;
}

export function checkDataIsValid(jsonData) {
    if (jsonData.title == null
        || jsonData.owner == null
        || jsonData.hidden == null
        || jsonData.content == null
        || jsonData.posted_time == null
        || typeof(jsonData.title) != 'string'
        || typeof(jsonData.owner[0]) != 'string'
        || typeof(jsonData.content) != 'string'
        || typeof(jsonData.posted_time) != 'number'
        || jsonData.title === ''
        || jsonData.content === ''
        || jsonData.hidden === true
    ) 
    {
        return false;
    }
    return true;
}

export function getData(id) {
    let data = {
        title: `Jays First Blog Jays First Blog Jays First Blog`,
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! <br /> <br /> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur.",
        num_medals: 10,
        owner: ['0x16e28aef682bf8de2ea0ced0b93e38e1ea0e6c6e'],
        posted_time: 1675869828035
    }

    return data;
}

export function getListBlogs() {
    return ['1', '2', '3', '4', '5', '6', '7'];
}

export function getMyBlogs() {
    return ['0x16e28aef682bf8de2ea0ced0b93e38e1ea0e6c6e', '2', '0x16e28aef682bf8de2ea0ced0b93e38e1ea0e6c6e', '4', '5', '6', '7'];
}


const moment = require('moment');
export function convertMillisToString(milliseconds) {
    const time_string = moment(milliseconds).format('MMMM D, h:mm A');
    return time_string;
}
