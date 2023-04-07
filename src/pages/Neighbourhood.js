import { useLoaderData } from "react-router-dom";
import NeighbourhoodData from "../components/Crime/NeighbourhoodData";
import { polyArrayToString } from "../util/ApiHelperFuncs";
import { useEffect, useState } from "react";
import { getCrimesMonthDetail } from "../util/GetCrimes";
import CategoryDateCrimeList from "../components/Crime/CategoryDateCrimeList";
import PageBanner from "../components/UI/PageBanner";
import PageSubBanner from "../components/UI/PageSubBanner";

const Neighbourhood = (props) => {
	console.log("new Render Neighbourhood")

	const loaderData = useLoaderData();
	const polyBoundaryQuery = loaderData.polyBoundaryQuery;
	const areaName = loaderData.areaName;
	const [catDateParams, setCatDateParams] = useState({
		date: null,
		category: null,
	});
	const [catDateData, setCatDateData] = useState(null);

	console.log(areaName);

	const getMonthCrimes = async () => {
		const monthsCrime = await getCrimesMonthDetail({
			date: catDateParams.date,
			category: catDateParams.category,
			polyBoundaryQuery: polyBoundaryQuery,
		});
		setCatDateData(monthsCrime);
	};

	useEffect(() => {
		if (catDateParams.date) {
			console.log("catDateParams useEffect")
			// console.log(catDateParams)
			getMonthCrimes();
		}
	}, [catDateParams]);

	console.log("catDateData");
	console.log(catDateData);

	if (polyBoundaryQuery) {
		return (
			<>
				<PageBanner>
					<h1>Neighbourhood Details</h1>
					<h2>{areaName}</h2>
				</PageBanner>
				<NeighbourhoodData
					polyBoundaryQuery={polyBoundaryQuery}
					setCatDateParams={setCatDateParams}
				/>

				{catDateData ? (
					<>
						<PageSubBanner>
							<h1>
								{catDateParams.category} crime during{" "}
								{catDateParams.date}
							</h1>
						</PageSubBanner>
						<CategoryDateCrimeList
							catDateData={catDateData}
							params={catDateParams}
						/>
					</>
				) : undefined}
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
	// let returnCode = null;
	let boundaryPoly = null;
	let areaName = null;
	let errorMessage = null;

	const forceID = params.forceID;
	const neighbourhoodID = params.neighbourhoodID;

	const forceBioResponse = await fetch(
		"https://data.police.uk/api/" + forceID + "/" + neighbourhoodID
	);
	if (forceBioResponse.ok) {
		const areaInfo = await forceBioResponse.json();
		areaName = areaInfo.name;
	}

	const neighBoundaryResponse = await fetch(
		"https://data.police.uk/api/" +
			forceID +
			"/" +
			neighbourhoodID +
			"/boundary"
	);

	let polyBoundaryQuery = "";
	if (neighBoundaryResponse.ok) {
		boundaryPoly = await neighBoundaryResponse.json();
		if (boundaryPoly.length > 0) {
			polyBoundaryQuery = polyArrayToString(boundaryPoly);
			// console.log(polyBoundaryQuery);
		}
	} else {
		errorMessage = "Error Loading Neighbourhood data";
	}

	return { areaName, polyBoundaryQuery, errorMessage };
}
