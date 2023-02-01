

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