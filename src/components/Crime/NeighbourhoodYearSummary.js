import { useCallback, useEffect, useState } from "react";
import { getCrimesYearSummary } from "../../util/GetCrimes";
import StackedBarYear from "../Charts/StackedBarYear";


const NeighbourhoodYearSummary = (props) => {

    const [yearData, setYearData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setapiError] = useState(null);



	const fetchYearDataHandler = useCallback(async () => {
		try {
			const response = await getCrimesYearSummary({
                category: "all-crime",
                polyBoundary: props.boundaryPoly,
            })
            setYearData(response)
            setapiError(response.errorMessage)

		} catch (error) {
			setapiError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchYearDataHandler()
	}, [fetchYearDataHandler]);

    console.log("yearData")
    console.log(yearData)

    if(yearData.barChartSeries){
        	return (
		<StackedBarYear
			barChartSeries={yearData.barChartSeries}
			barChartLabels={yearData.barChartLabels}
		/>
        // <h1>Stacked</h1>
	);
    } else{
        return(
            <h1>Loading</h1>
        )
    }


};

export default NeighbourhoodYearSummary;