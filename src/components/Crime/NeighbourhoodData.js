import { useCallback, useEffect, useState } from "react";
import { getCrimesYearSummary } from "../../util/GetCrimes";
import StackedBarYear from "../Charts/StackedBarYear";
import BarChartMonth from "../Charts/BarChartMonth";

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
				polyBoundary: props.boundaryPoly,
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
				// setRefinedRow({date})
				// Get Data for month
				let categoryTotals = [];
				yearData.barChartSeries.forEach(function (arrayItem) {
					// console.log(arrayItem.name)
					// console.log(arrayItem.data[labelIndex])
					// categoryTotals.push({name: arrayItem.name , data: arrayItem.data[labelIndex]})
					categoryTotals.push(arrayItem.data[labelIndex])
				});
				setRefinedRow({date, categoryTotals})
				break;
			case "dataClick":
				console.log("dataClick " + date +  " : " + category)
				setRefinedDataPoint({date,category})
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


