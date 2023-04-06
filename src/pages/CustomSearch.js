import { useEffect, useState } from "react";
import { createCircleCoordinatesPoly } from "../util/PolyCircle";
import NeighbourhoodData from "../components/Crime/NeighbourhoodData";
import PageBanner from "../components/UI/PageBanner";
import { getCrimesMonthDetail } from "../util/GetCrimes";
import PageSubBanner from "../components/UI/PageSubBanner";
import CategoryDateCrimeList from "../components/Crime/CategoryDateCrimeList";
import CustomSearchInput from "../components/Search/CustomSearchInput";

const CustomSearch = () => {
	const [polyBoundaryQuery, setPolyBoundaryQuery] = useState(null);

	// const lat = 50.364381;
	// const lng = -4.159613;
	// const radius = 1.6;
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const [radius, setRadius] = useState(null);

	const searchFromSubmitted = (formData) => {
		setLat(formData.inputLat);
		setLng(formData.inputLng);
		setRadius(formData.inputRadius);
	};

	useEffect(() => {
		console.log("use effect lat lng");
		if (lat && lng && radius) {
			console.log("setpolyCalled");
			// if (!polyBoundaryQuery) {
			setPolyBoundaryQuery(createCircleCoordinatesPoly(lat, lng, radius));
			// }
		}
	}, [lat, lng, radius]);

	const [catDateParams, setCatDateParams] = useState({
		date: null,
		category: null,
	});
	const [catDateData, setCatDateData] = useState(null);

	useEffect(() => {
		if (catDateParams.date) {
			// console.log("catDateParams")
			// console.log(catDateParams)
			getMonthCrimes();
		}
	}, [catDateParams]);

	console.log("polyBoundaryQuery");
	console.log(polyBoundaryQuery);

	const getMonthCrimes = async () => {
		console.log("getMonths");
		const monthsCrime = await getCrimesMonthDetail({
			date: catDateParams.date,
			category: catDateParams.category,
			polyBoundaryQuery: polyBoundaryQuery,
		});
		setCatDateData(monthsCrime);
	};

	return (
		<>
			<PageBanner>
				<h1>Search Around a Location</h1>
				<p>
					Use you own parameters to search for crime around a specific
					point.
				</p>
			</PageBanner>

			<CustomSearchInput searchFormSubmitted={searchFromSubmitted} />

			{polyBoundaryQuery ? (
				<NeighbourhoodData
					polyBoundaryQuery={polyBoundaryQuery}
					setCatDateParams={setCatDateParams}
				/>
			) : undefined}

			{polyBoundaryQuery && catDateData ? (
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
};

export default CustomSearch;
