

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