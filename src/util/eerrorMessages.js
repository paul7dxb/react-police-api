export const getErrorMessageFromResponseCode = (code) =>{
    const codeStr = String(code)
    console.log(codeStr)
    if(codeStr === "404"){
        return "url not found from API call"
    }else if (codeStr === "503"){
        return "Request not completed"
    }
    else if (codeStr === "414"){
        return "Request URI too long"
    }
    return ("Some unknown error occured getting data: " + codeStr)
}