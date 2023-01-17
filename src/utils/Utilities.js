

export function isLogedIn()
{
    // todo: check function
    return false;
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