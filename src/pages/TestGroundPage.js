import { useCallback, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getCrimesMonthSummary } from "../util/GetCrimes";

const TestGroundPage = () => {
	const getCrimesYearSummary = async (params) => {
		let queryDates = [
			"2023-02",
			"2023-01",
			"2022-12",
			"2022-11",
			"2022-10",
			"2022-09",
			"2022-08",
		];

		let errorMessage = null;
		let yearSummaryData = [];
		const allCategoriesSet = new Set();
		const polyBoundaryQuery =
			"poly=50.45625,-4.16042:50.45625,-4.16042:50.45575,-4.14566:50.45428,-4.13105:50.43904,-4.07742:50.43311,-4.06595:50.42644,-4.05551:50.41912,-4.04623:50.41122,-4.03821:50.40282,-4.03152:50.39403,-4.02626:50.38493,-4.02246:50.37563,-4.02018:50.27638";

		for (let i = 0; i < queryDates.length; i++) {
			let newParams = {
				category: "all-crime",
				date: queryDates[i],
				polyBoundaryQuery,
			};
			// Delay each API call by 100ms
			await new Promise((resolve) => setTimeout(resolve, 100));
			let newMonthData = await getCrimesMonthSummary(newParams);
			if (newMonthData.errorMessage) {
				errorMessage = yearSummaryData[i].error;
			} else {
				//Extract categories
				newMonthData.data.categories.forEach(
					allCategoriesSet.add,
					allCategoriesSet
				);
				yearSummaryData.push(newMonthData.data.crimes);
			}
		}
		console.log("yearSummaryData");
		console.log(yearSummaryData);

		// Used for data series
		const allCategoriesArray = Array.from(allCategoriesSet);
	};

	useEffect(() => {
		getCrimesYearSummary("params");
	}, []);

	return <h1>Test page</h1>;
};

export default TestGroundPage;
