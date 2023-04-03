import { useCallback, useEffect, useState } from "react";
import { getCrimesYearSummary } from "../../util/GetCrimes";
import StackedBarYear from "../Charts/StackedBarYear";

const NeighbourhoodYearSummary = (props) => {
	const [yearData, setYearData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [apiError, setapiError] = useState(null);

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

	console.log("yearData");
	console.log(yearData);

	if (isLoading) {
		return <h1>Loading data...</h1>;
	}

	if (!isLoading && yearData.barChartSeries) {
		return (
			<StackedBarYear
				barChartSeries={yearData.barChartSeries}
				barChartLabels={yearData.barChartLabels}
			/>
		);
	} else {
		return (
        <>
        <h1>Something Went Wrong</h1>
        {apiError? <h3>{apiError}</h3> : undefined}
        </>
        );
	}
};

export default NeighbourhoodYearSummary;
