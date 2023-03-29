import { useLoaderData, useParams } from "react-router-dom";
import CategoryTotalList from "../components/Crime/CategoryTotalsList";
import { getCrimesYearSummary } from "../util/GetCrimes";

const Neighbourhood = () => {
	const params = useParams();

	const loaderData = useLoaderData();
	const yearSummaryData = loaderData.neighCrimes.data;
	console.log("yearSummaryData")
	console.log(yearSummaryData)

	if (yearSummaryData) {
		return (
			<>
				<h1>Neighbourhood Details</h1>
				<h2>{params.neighbourhoodID}</h2>
				<CategoryTotalList yearSummaryData={yearSummaryData} />
			</>
		);
	} else {
		return (
			<>
				<h1>Neighbourhood Details</h1>
				<h2>{params.neighbourhoodID}</h2>
				<p>Summary data unavailable. {loaderData.neighCrimes.errorMessage}</p>
			</>
		);
	}
};

export default Neighbourhood;

export async function loader({ request, params }) {
	let returnCode = null;
	let boundaryPoly = null;

	const forceID = params.forceID;
	const neighbourhoodID = params.neighbourhoodID;

	const neighBoundaryResponse = await fetch(
		"https://data.police.uk/api/" +
			forceID +
			"/" +
			neighbourhoodID +
			"/boundary"
	);
	if (neighBoundaryResponse.ok) {
		boundaryPoly = await neighBoundaryResponse.json();
	}

	const neighCrimes = await getCrimesYearSummary({
		category: "all-crime",
		polyBoundary: boundaryPoly
	});

	return { neighCrimes };
}
