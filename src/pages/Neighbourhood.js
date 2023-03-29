import { useLoaderData, useParams } from "react-router-dom";
import { getCrimesSummary } from "../util/GetCrimes";

const Neighbourhood = () => {
	const params = useParams();
	// console.log(params);

	const loaderData = useLoaderData();

	const summaryData = loaderData.neighCrimes.summaryData;
	console.log("neighCrimes comp");
	console.log(summaryData);

	if (loaderData.neighCrimes) {
		return (
			<>
				<h1>Neighbourhood Details</h1>
				<h2>{params.neighbourhoodID}</h2>
				<h3>Total Crime {summaryData.totalCrime}</h3>
				<p>Start of data</p>
				{summaryData.categoryTotals.map((elem) => (
					<p key={elem[0]}>
						{elem[0]} : {elem[1]}
					</p>
				))}
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

		// console.log(boundaryPoly)
		// console.log(boundaryPoly[0])
		// console.log(boundaryPoly[0].latitude)
	}

	const neighCrimes = await getCrimesSummary({
		category: "all-crime",
		polyBoundary: boundaryPoly,
		date: "2022-08",
	});

	console.log("neighCrimes");
	console.log(neighCrimes);

	return { neighCrimes };
}
