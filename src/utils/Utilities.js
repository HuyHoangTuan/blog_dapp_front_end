
import * as IPFS from 'ipfs-core';
import {Buffer} from 'buffer'; 
import { getBlogItemContract, getFees, publishBlog } from './Abi';
// const node_ipfs = await IPFS.create();
var node_ipfs = null;

async function _getNodeIPFS()
{
    if(node_ipfs == null) node_ipfs = await IPFS.create();
    return node_ipfs;
}
export function isLogedIn()
{
    // todo: check function
    let accounts = [];
    if (sessionStorage.getItem("accounts") != null)
    {
        accounts = JSON.parse(sessionStorage.getItem("accounts"));
    }
    console.log("connected accounts: "+ JSON.stringify(accounts));
    return accounts.length>0;
}

export function getAccounts()
{
    let accounts = [];
    if (sessionStorage.getItem("accounts") != null)
    {
        accounts = JSON.parse(sessionStorage.getItem("accounts"));
    }
    if(accounts == null) accounts = [];
    return accounts;
}

export function log(...str)
{
    let output = "";
    str.forEach((element) => {
        output += JSON.stringify(element)+" ";
    });
    console.log("LOG: "+output);
}

export function isMetaMaskInstalled()
{
    const {ethereum} = window;
    if(ethereum && ethereum.isMetaMask)
    {
        return true;
    }
    return false;
}
export function isLoading(){
    return (
        <div classname="Loading">
            hello
        </div>
    )
}

export function makeIPFSData({title, content, num_medals, owner})
{
    let data = {
        title: title,
        content: content,
        num_medals: num_medals,
        owner: owner
    }

    return encodeData(JSON.stringify(data));
}

export function encodeData(data)
{
    return data;
}

export function decodeData(encodedData)
{
    return encodedData;
}

export async function addFileToIPFS(filePath, content, warpWithDirectory = true)
{
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
    return  result;
}

export async function retrieveConternFromIPFS(hashAddress)
{
    let data = "";
    let node = await _getNodeIPFS();
    for await(let chunk of node.cat(hashAddress))
    {
        data = data + Buffer.from(chunk).toString();
    }
    return JSON.parse(decodeData(data));
}

export function getData()
{
    let data = {
        title: "Jays First Blog",
        content: "Hey I'm Jay! Blockchain developer advocate from Helsinki Finland.\n\nI can't wait to see where this space evolves.",
        num_medals: 10,
        owner: "David",
        posted_time: "Mar 21"
    }

    return data;
}
