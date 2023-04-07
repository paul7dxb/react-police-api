import { getLastYear } from "./ApiDatabaseInfo";
import { getErrorMessageFromResponseCode } from "./ErrorMessages";
import { convertYearDataToChartSeries } from "./GraphFunctions";

// Params category, polyBoundary
export const getCrimesYearSummary = async (params) => {
	console.log("params");
	console.log(params);
	let queryDates = [];
	queryDates = await getLastYear();

	let errorMessage = null;

	let yearSummaryData = [];
	const allCategoriesSet = new Set();

	// Reduce polyboundary array to string that fits query length
	const polyBoundaryQuery = params.polyBoundaryQuery
		? params.polyBoundaryQuery
		: null;

	// // Method to loop through and process sequentially
	// for (let i = 0; i < queryDates.length; i++) {
	// 	console.log(i)
	// 	let newParams = {
	// 		category: params.category,
	// 		date: queryDates[i],
	// 		polyBoundaryQuery,
	// 	};
	// 	console.log("getCrimesMonthSummary: " + queryDates[i])
	// 	let newMonthData = await getCrimesMonthSummary(newParams);
	// 	if (newMonthData.errorMessage) {
	// 		errorMessage = yearSummaryData[i].error;
	// 	} else {
	// 		//Extract categories
	// 		newMonthData.data.categories.forEach(
	// 			allCategoriesSet.add,
	// 			allCategoriesSet
	// 		);
	// 		yearSummaryData.push(newMonthData.data.crimes);
	// 	}
	// }

	// Function to make the API call with a delay of 100ms
	// Function to make the API call
	const getCrimesMonthSummaryAsync = async (date) => {
		const newParams = {
			category: "all-crime",
			date: date,
			polyBoundaryQuery,
		};
		return await getCrimesMonthSummary(newParams);
	};

	// Returns a Promise that resolves after "ms" Milliseconds
	const timer = (ms) => new Promise((res) => setTimeout(res, ms));

	// Create an array of promises for all the API calls
	// const promises = queryDates.map(getCrimesMonthSummaryAsync);
	// await new Promise((resolve) => setTimeout(resolve, 500));
	// console.log("after promises")
	let promises = []
	for (let i = 0; i < queryDates.length; i++) {
		await timer(200);
		promises.push(getCrimesMonthSummaryAsync(queryDates[i]))
	}
	// const promises = queryDates.map(getCrimesMonthSummaryAsync);

	// Wait for all promises to resolve
	const monthDataArray = await Promise.all(promises);

	// Process the data once all the promises have resolved
	for (let i = 0; i < monthDataArray.length; i++) {
		const newMonthData = monthDataArray[i];
		if (newMonthData.errorMessage) {
			errorMessage = yearSummaryData[i].error;
		} else {
			// Extract categories
			newMonthData.data.categories.forEach(
				allCategoriesSet.add,
				allCategoriesSet
			);
			yearSummaryData.push(newMonthData.data.crimes);
		}
	}

	// Used for data series
	const allCategoriesArray = Array.from(allCategoriesSet);

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
			throw new Error(response);
		}

		returnCode = await response.status;
		if (returnCode === 200) {
			data = await response.json();
			const summaryData = countCategories(data);

			return { data: summaryData, errorMessage, date };
		} else {
			console.log("error in getMonths");
			return {
				data: null,
				errorMessage: getErrorMessageFromResponseCode(returnCode),
				date,
			};
		}
	} catch (error) {
		throw new Error(error);
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
	// console.log("counting Crimes");
	let crimes = {};
	let categories = [];

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

	return {
		categories,
		crimes,
	};
};
