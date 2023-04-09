/*
// Component to display the returned info from the forces api call
*/

import { getAllForces } from "../../util/AllForces";
import { useState, useEffect, useCallback } from "react";
import ForcesListItem from "./ForcesListItem";
import classes from "./ForcesList.module.css";

const ForcesList = () => {
	const [forcesData, setForcesData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setapiError] = useState(null);
	const [forceFilter, setForceFilter] = useState("");

	const fetchForcesListHandler = useCallback(async () => {
		try {
			const response = await getAllForces();
			setForcesData(response.data);
			setapiError(response.errorMessage);
		} catch (error) {
			setapiError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchForcesListHandler();
	}, [fetchForcesListHandler]);

	// console.log(forceFilter);

	return (
		<>
			<input
			className={classes.forceFilterInput}
				id="filter"
				name="filter"
				type="text"
				placeholder="Filter Forces"
				// value={filter}
				onChange={(event) =>
					setForceFilter(event.target.value.toUpperCase())
				}
			/>
			<div className={classes.forceListContainer}>
				{forcesData
					? forcesData
							.filter((elem) =>
								elem["name"].toUpperCase().includes(forceFilter)
							)
							.map((elem) => (
								<ForcesListItem
									key={elem["id"]}
									forceID={elem["id"]}
									forceName={elem["name"]}
								/>
							))
					: undefined}
				{apiError ? <h2>{apiError}</h2> : undefined}
			</div>
		</>
	);
};
export default ForcesList;
