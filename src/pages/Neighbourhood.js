import { useLoaderData, useParams } from "react-router-dom";
// import CategoryTotalList from "../components/Crime/CategoryTotalsList";
import NeighbourhoodYearSummary from "../components/Crime/NeighbourhoodYearSummary";
import { getCrimesYearSummary } from "../util/GetCrimes";
import StackedBarYear from "../components/Charts/StackedBarYear";

const Neighbourhood = () => {
	const params = useParams();

	const loaderData = useLoaderData();
	// const yearSummaryData = loaderData.neighCrimes.data;
	// const barChartSeries = loaderData.neighCrimes.barChartSeries;
	// const barChartLabels = loaderData.neighCrimes.barChartLabels;
	const boundaryPoly = loaderData.boundaryPoly;
	const areaName = loaderData.areaName;

	console.log(areaName);
	// console.log(yearSummaryData);
	// console.log("component data");
	// console.log(loaderData.neighCrimes.barChartSeries);
	// console.log(loaderData.neighCrimes.barChartLabels);
	// console.log("component data");

	if (boundaryPoly) {
		return (
			<>
				<h1>Neighbourhood Details</h1>
				<h2>{areaName}</h2>
				<NeighbourhoodYearSummary boundaryPoly={boundaryPoly}  />
				{/* <StackedBarYear barChartSeries={barChartSeries} barChartLabels={barChartLabels} /> */}
				{/* <CategoryTotalList yearSummaryData={yearSummaryData} /> */}
			</>
		);
	} else {
		return (
			<>
				<h1>Neighbourhood Details</h1>
				<h2>{areaName}</h2>
				<p>
					Summary data unavailable.{" "}
					{loaderData.neighCrimes.errorMessage}
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
	}

	// const neighCrimes = await getCrimesYearSummary({
	// 	category: "all-crime",
	// 	polyBoundary: boundaryPoly,
	// });

	// return { neighCrimes, areaName, boundaryPoly };
	return { areaName, boundaryPoly };
}
