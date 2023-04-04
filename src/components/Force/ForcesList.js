/*
// Component to display the returned info from the forces api call
*/

import { getAllForces } from "../../util/AllForces";
import { useState, useEffect,useCallback } from "react";
import ForcesListItem from "./ForcesListItem";

const ForcesList = () => {
	const [forcesData, setForcesData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setapiError] = useState(null);

	const fetchForcesListHandler = useCallback(async () => {
		try {
			const response = await getAllForces();
            setForcesData(response.data)
            setapiError(response.errorMessage)
		} catch (error) {
			setapiError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchForcesListHandler()
	}, [fetchForcesListHandler]);

	return (
		<>
			<h1>Forces List</h1>
			<p>Below is the list of Police Forces in the UK that provide data </p>
			{forcesData ? forcesData.map((elem) => (
				<ForcesListItem key={elem["id"]} forceID={elem["id"]} forceName={elem["name"]} />
			)) : undefined}
            {apiError ? <h2>{apiError}</h2> : undefined }
		</>
	);
};
export default ForcesList;
