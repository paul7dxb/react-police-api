import { useCallback, useEffect, useState } from "react";
import { getCrimesYearSummary } from "../../util/GetCrimes";
import StackedBarYear from "../Charts/StackedBarYear";
import BarChartMonth from "../Charts/BarChartMonth";
import { useParams } from "react-router-dom";
import CrimeList from "./CrimeList";

const NeighbourhoodYearSummary = (props) => {


	// Year Summary Data
	const [yearData, setYearData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [apiError, setapiError] = useState(null);

	// Graph Selections
	const [refinedRow, setRefinedRow] = useState(null);
	const [refinedDataPoint, setRefinedDataPoint] = useState(null);

	const fetchYearDataHandler = useCallback(async () => {
		try {
			const response = await getCrimesYearSummary({
				category: "all-crime",
				polyBoundaryQuery: props.polyBoundaryQuery,
			});
			setYearData(response);
			setapiError(response.errorMessage);
		} catch (error) {
			setapiError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchYearDataHandler();
	}, [fetchYearDataHandler]);

	// Click Handler
	const yearGraphClickedHandler = ({type, date, category, labelIndex }) => {
		switch(type){
			case "axisClick":
				console.log("axisClick " + date + " #: " + labelIndex )
				let categoryTotals = [];
				yearData.barChartSeries.forEach(function (arrayItem) {
					categoryTotals.push(arrayItem.data[labelIndex])
				});
				setRefinedRow({date, categoryTotals})
				break;
			case "dataClick":
				console.log("dataClick " + date +  " : " + category)
				setRefinedDataPoint({date, category, polyBoundaryQuery: yearData.polyBoundaryQuery})
				break;
		}
		console.log(yearData)
	};

	if (isLoading) {
		return <h1>Loading data...</h1>;
	}


	if (!isLoading && yearData.barChartSeries) {
		return (
			<>
				<StackedBarYear
					barChartSeries={yearData.barChartSeries}
					barChartLabels={yearData.barChartLabels}
					onClick={yearGraphClickedHandler}
				/>
				{refinedRow ? <BarChartMonth date={refinedRow.date} barChartSeries={refinedRow.categoryTotals} barChartLabels={yearData.allCategoriesArray} /> : undefined }
				{refinedDataPoint ? <CrimeList useLessProp={"234"} queryParams={refinedDataPoint}  /> : undefined}
			</>
		);
	} else {
		return (
			<>
				<h1>Something Went Wrong</h1>
				{apiError ? <h3>{apiError}</h3> : undefined}
			</>
		);
	}
};

export default NeighbourhoodYearSummary;


