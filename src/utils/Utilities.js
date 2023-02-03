
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
export function isLoading(){
    return (
        <div classname="Loading">
            hello
            <img
            classname = "logo"
            src ="logo192.png"
            ></img> 
            <h1 className = "title">
            hello xin chào bạn
            </h1>
            </div>
    )
}