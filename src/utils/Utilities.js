
export function isLogedIn()
{
    // todo: check function
    let accounts = [];
    if (localStorage.getItem("accounts") != null)
    {
        accounts = JSON.parse(localStorage.getItem("accounts"));
    }
    console.log("connected accounts: "+ JSON.stringify(accounts));
    return accounts.length>0;
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
    // console.log(window);
    // console.log(window.ethereum);
    if(ethereum && ethereum.isMetaMask)
    {
        return true;
    }
    return false;
}