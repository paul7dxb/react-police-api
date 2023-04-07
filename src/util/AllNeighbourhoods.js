import { getErrorMessageFromResponseCode } from "./ErrorMessages";


export const getAllNeighbourhoods = async(forceID) => {
	let errorMessage = null;
	let data = null;
    let returnCode = null;

    const url = "https://data.police.uk/api/" + forceID + "/neighbourhoods"

		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(response.status);
			}
			
			// console.log(data);

            returnCode = await response.status
            if(returnCode === 200){
                data = await response.json();
                return {data, errorMessage}
            } else {
                return {data:null , errorMessage : getErrorMessageFromResponseCode(returnCode)}
            }

		} catch (error) {
            return {data:null , errorMessage : getErrorMessageFromResponseCode(error.message)}
		}


};
