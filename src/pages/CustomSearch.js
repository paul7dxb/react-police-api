import { useEffect, useState } from "react";
import { createCircleCoordinatesPoly } from "../util/PolyCircle";
import NeighbourhoodData from "../components/Crime/NeighbourhoodData";
import PageBanner from "../components/UI/PageBanner";
import { getCrimesMonthDetail } from "../util/GetCrimes";
import PageSubBanner from "../components/UI/PageSubBanner";
import CategoryDateCrimeList from "../components/Crime/CategoryDateCrimeList";


const CustomSearch = () => {
	const [polyBoundaryQuery, setPolyBoundaryQuery] = useState(null);

	const [catDateParams, setCatDateParams] = useState({
		date: null,
		category: null,
	});
	const [catDateData, setCatDateData] = useState(null);

	const lat = 50.364381;
	const lng = -4.159613;
	const radius = 1.6;
	useEffect(() => {
		setPolyBoundaryQuery(createCircleCoordinatesPoly(lat, lng, radius));
	}, []);

	useEffect(() => {
		if (catDateParams.date) {
			// console.log("catDateParams")
			// console.log(catDateParams)
			getMonthCrimes();
		}
	}, [catDateParams]);

	console.log(polyBoundaryQuery);

	const getMonthCrimes = async () => {
		const monthsCrime = await getCrimesMonthDetail({
			date: catDateParams.date,
			category: catDateParams.category,
			polyBoundaryQuery: polyBoundaryQuery,
		});
		setCatDateData(monthsCrime);
	};

	if (polyBoundaryQuery) {
		return (
			<>
				<PageBanner>
					<h1>Custom</h1>
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
					{/* {loaderData.errorMessage} */}
				</p>
			</>
		);
	}
};

export default CustomSearch;
