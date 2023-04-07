import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
		if (lat && lng && radius) {
			setPolyBoundaryQuery(createCircleCoordinatesPoly(lat, lng, radius));
		}
	}, [lat, lng, radius]);

	const [catDateParams, setCatDateParams] = useState({
		date: null,
		category: null,
	});
	const [catDateData, setCatDateData] = useState(null);

	useEffect(() => {
		if (catDateParams.date) {
			getMonthCrimes();
		}
	}, [catDateParams]);


	const getMonthCrimes = async () => {
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
				<h1>Search Around A Location</h1>
				<p>
					Use you own parameters to search for crime around a specific
					point. The radius will define how far from the location crimes will be found.
				</p>
				<p>The search is performed using a location's latitude and longitude. The easiest way to find these for a desired location is by placing a selecting a point in <a href="https://www.google.com/maps">Google Maps</a> and reading the values from the box that will pop up.</p>
				<p>Note: Crime locaitons go through an anonymisation and are not always precisely located. See more <Link to="/more-info">here</Link>.</p>
			</PageBanner>

			<CustomSearchInput searchFormSubmitted={searchFromSubmitted} />

			{polyBoundaryQuery ? (
				<NeighbourhoodData key={polyBoundaryQuery}
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
