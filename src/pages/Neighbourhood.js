import { useLoaderData, useParams } from "react-router-dom";
import NeighbourhoodData from "../components/Crime/NeighbourhoodData";

const Neighbourhood = () => {
	const params = useParams();

	const loaderData = useLoaderData();
	const boundaryPoly = loaderData.boundaryPoly;
	const areaName = loaderData.areaName;

	console.log(areaName);


	if (boundaryPoly) {
		return (
			<>
				<h1>Neighbourhood Details</h1>
				<h2>{areaName}</h2>
				<NeighbourhoodData boundaryPoly={boundaryPoly}   />
			</>
		);
	} else {
		return (
			<>
				<h1>Neighbourhood Details</h1>
				<p>
					Summary data unavailable.
					{loaderData.errorMessage}
				</p>
			</>
		);
	}
};

export default Neighbourhood;



export async function loader({ request, params }) {
	let returnCode = null;
	let boundaryPoly = null;
	let areaName = null;
	let errorMessage = null

	const forceID = params.forceID;
	const neighbourhoodID = params.neighbourhoodID;

	const forceBioResponse = await fetch(
		"https://data.police.uk/api/" + 	forceID +
		"/" +
		neighbourhoodID
	);
	if (forceBioResponse.ok) {
		const areaInfo = await forceBioResponse.json();
		areaName = areaInfo.name
	}

	const neighBoundaryResponse = await fetch(
		"https://data.police.uk/api/" +
			forceID +
			"/" +
			neighbourhoodID +
			"/boundary"
	);

	if (neighBoundaryResponse.ok) {
		boundaryPoly = await neighBoundaryResponse.json();
	} else {
		errorMessage = "Error Loading Neighbourhood data"
	}

	return { areaName, boundaryPoly, errorMessage };
}
