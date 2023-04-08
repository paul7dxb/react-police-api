import { useCallback, useEffect, useState } from "react";
import { getCrimesYearSummary } from "../../util/GetCrimes";
import StackedBarYear from "../Charts/StackedBarYear";
import BarChartMonth from "../Charts/BarChartMonth";
import { useParams } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./NeighbourhoodYearSummary.module.css";
import Loader from "../UI/Loader";
import PageSubBanner from "../UI/PageSubBanner";
import RefinedDataSelctor from "./RefinedDataSelctor";

const NeighbourhoodYearSummary = (props) => {
	// Year Summary Data
	const [yearData, setYearData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [apiError, setapiError] = useState(null);

	// Graph Selections
	const [refinedRow, setRefinedRow] = useState(null);
	// const [refinedDataPoint, setRefinedDataPoint] = useState(null);

	const fetchYearDataHandler = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await getCrimesYearSummary({
				category: "all-crime",
				polyBoundaryQuery: props.polyBoundaryQuery,
			});
			setYearData(response);
			setapiError(response.errorMessages);
		} catch (error) {
			setapiError(error.messages);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchYearDataHandler();
	}, []);

	const dateSelectedHandler = (dropdown) => {
		const chosenIndex = dropdown.target.selectedIndex -1 ; // -1 because of index for "select an option"
		const chosenDate = yearData.barChartLabels[chosenIndex];
		totalsFromDate(chosenDate, chosenIndex);
	};

	const totalsFromDate = (date, index) => {
		let categoryTotals = [];
		yearData.barChartSeries.forEach(function (arrayItem) {
			categoryTotals.push(arrayItem.data[index]);
		});
		setRefinedRow({ date, categoryTotals });
	};

	// Click Handler
	const yearGraphClickedHandler = ({ type, date, category, labelIndex }) => {
		switch (type) {
			case "axisClick":
				console.log("axisClick " + date + " #: " + labelIndex);
				totalsFromDate(date, labelIndex)
				// let categoryTotals = [];
				// yearData.barChartSeries.forEach(function (arrayItem) {
				// 	categoryTotals.push(arrayItem.data[labelIndex]);
				// });
				// setRefinedRow({ date, categoryTotals });
				break;
			case "dataClick":
				console.log("dataClick " + date + " : " + category);
				props.setCatDateParams({ date, category });
				break;
		}
	};

	if (isLoading) {
		return <Loader message="Loading Data..." />;
	}

	if (!isLoading && yearData.barChartSeries) {
		return (
			<>
				{apiError.length > 0 ? (
					<Card>
						{" "}
						<p>
							Something went wrong fetching data: {apiError}
						</p>{" "}
					</Card>
				) : undefined}
				<Card className={classes.yearGraphCard}>
					<StackedBarYear
						barChartSeries={yearData.barChartSeries}
						barChartLabels={yearData.barChartLabels}
						onClick={yearGraphClickedHandler}
					/>
				</Card>
				<PageSubBanner>
					<h2>Look Further Into The Data:</h2>
					<p>
						Selecting a month's data either from the dropdown box or
						selecting a date on the graph's axis above will present
						that month's data more clearly on a new graph below.
					</p>
					<p>
						You can also select a specfic category in a month (from
						either graph) to view the appoximate location of the
						crime and the latest update on the outcome of the crime
						if it has been updated.
					</p>
				<RefinedDataSelctor
					dateOptions={yearData.barChartLabels}
					dateSelectedHandler={dateSelectedHandler}
					selectedValue = {refinedRow ? refinedRow.date : null}
				/>
				</PageSubBanner>
				{refinedRow ? (
					<Card className={classes.monthGraphCard}>
						<BarChartMonth
							date={refinedRow.date}
							barChartSeries={refinedRow.categoryTotals}
							barChartLabels={yearData.allCategoriesArray}
							onClick={yearGraphClickedHandler}
						/>
					</Card>
				) : undefined}
				{/* {refinedDataPoint ? <CrimeList useLessProp={"234"} queryParams={refinedDataPoint}  /> : undefined} */}
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
