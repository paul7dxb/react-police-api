import { getLastYear } from "./ApiDatabaseInfo";
import { getErrorMessageFromResponseCode } from "./errorMessages";
import { convertYearDataToChartSeries } from "./GraphFunctions";

// Params category, polyBoundary
export const getCrimesYearSummary = async (params) => {
	let queryDates = [];
	queryDates = await getLastYear();
	// console.log("queryDates");
	// console.log(params);

	let errorMessage = null;

	let yearSummaryData = [];
	const allCategoriesSet = new Set();

	// Reduce polyboundary array to string that fits query length
	const polyBoundaryQuery = params.polyBoundaryQuery
		? params.polyBoundaryQuery
		: null;

	// console.log("polyBoundaryQuery");
	// console.log(polyBoundaryQuery);

	for (let i = 0; i < queryDates.length; i++) {
		let newParams = {
			category: params.category,
			date: queryDates[i],
			polyBoundaryQuery,
		};
		let newMonthData = await getCrimesMonthSummary(newParams);
		if (newMonthData.errorMessage) {
			console.log("error in year loop");
			errorMessage = yearSummaryData[i].error;
		} else {
			//Extract categories
			newMonthData.data.categories.forEach(
				allCategoriesSet.add,
				allCategoriesSet
			);
			// console.log(allCategoriesSet)
			yearSummaryData.push(newMonthData.data.crimes);
		}
	}

	// Used for data series
	const allCategoriesArray = Array.from(allCategoriesSet);

	// console.log(yearSummaryData);

	const barChartSeries = convertYearDataToChartSeries(
		yearSummaryData,
		allCategoriesArray
	);

	return {
		data: yearSummaryData,
		errorMessage,
		barChartSeries,
		barChartLabels: queryDates,
		allCategoriesArray,
	};
};

// Expected params {date, category, polyBoundaryQuery}
export const getCrimesMonthDetail = async (params) => {
	const apiQuery = createQuery(params);
	const date = params.date;
	let errorMessage = null;
	let responseData = null;
	let data = null;
	let returnCode = null;

	try {
		const response = await fetch(apiQuery);
		if (!response.ok) {
			throw new Error(response.status);
		}

		returnCode = await response.status;
		if (returnCode === 200) {
			responseData = await response.json();

			console.log("responseData");
			console.log(responseData);
			// const summaryData = countCategories(data);
			// // console.log(summaryData);
			// responseData.forEach(function (arrayItem) {
			// 	const 
			// })

			return { data: responseData, errorMessage, date };
		} else {
			return {
				data: null,
				errorMessage: getErrorMessageFromResponseCode(returnCode),
				date,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			data: null,
			errorMessage: getErrorMessageFromResponseCode(error.message),
			date,
		};
	}
};

export const getCrimesMonthSummary = async (params) => {
	const apiQuery = createQuery(params);
	const date = params.date;
	let errorMessage = null;
	let data = null;
	let returnCode = null;

	try {
		const response = await fetch(apiQuery);
		if (!response.ok) {
			throw new Error(response.status);
		}

		returnCode = await response.status;
		if (returnCode === 200) {
			data = await response.json();
			// console.log(data);
			const summaryData = countCategories(data);
			// console.log(summaryData);

			return { data: summaryData, errorMessage, date };
		} else {
			return {
				data: null,
				errorMessage: getErrorMessageFromResponseCode(returnCode),
				date,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			data: null,
			errorMessage: getErrorMessageFromResponseCode(error.message),
			date,
		};
	}
};

// Create the URL string for a query to get all crime for given parameters
// Expected params (date, category, polyBoundaryQuery)
const createQuery = (params) => {
	const categoryParam = params.category ? params.category : null;
	const dateParam = params.date ? params.date : null;

	let queryString = "https://data.police.uk/api/crimes-street/";

	let categoryQueryString = "";
	if (categoryParam) {
		categoryQueryString = categoryParam + "?";
	} else {
		categoryQueryString = "all-crime?";
	}

	let dateQueryString = "&";
	if (dateParam) {
		dateQueryString += "date=" + dateParam;
	}

	queryString +=
		categoryQueryString + params.polyBoundaryQuery + dateQueryString;
	return queryString;
};

const countCategories = (crimeDataArray) => {
	// console.log(crimeDataArray);
	let crimes = {};
	let categories = [];
	// let crimesArr = [];

	let totalCrimeTally = 0;

	for (const key in crimeDataArray) {
		// count category totals
		if (crimes[crimeDataArray[key].category]) {
			crimes[crimeDataArray[key].category] += 1;
		} else {
			crimes[crimeDataArray[key].category] = 1;
			categories.push(crimeDataArray[key].category);
		}

		totalCrimeTally++;
	}
	// console.log("totalled");
	// console.log(crimes);
	// const crimesArr = Object.keys(crimes).map((key) => [key, crimes[key]]);

	return {
		// totalCrime: totalCrimeTally,
		categories,
		crimes,
	};
};
