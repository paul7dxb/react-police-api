import { getErrorMessageFromResponseCode } from "./errorMessages";


export const getAllForces = async() => {
	let errorMessage = null;
	let data = null;
    let returnCode = null;

		try {
			const response = await fetch("https://data.police.uk/api/forces");
			if (!response.ok) {
				throw new Error(response.status);
			}
			
			console.log(data);

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
