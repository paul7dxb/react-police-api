export const getErrorMessageFromResponseCode = (code) =>{
    if(code === "404"){
        return "url not found from API call"
    }else if (code === "503"){
        return "Request not completed"
    }
    return ("Some unknown error occured getting data: " + code)
}