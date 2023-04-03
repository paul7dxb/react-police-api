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
	const polyBoundaryArrayParam = params.polyBoundary
		? params.polyBoundary
		: null;
	let polyBoundaryQuery = "";
	if (polyBoundaryArrayParam.length > 0) {
		polyBoundaryQuery = polyArrayToString(polyBoundaryArrayParam);
	}

	for (let i = 0; i < queryDates.length; i++) {
		let newParams = { category: params.category, date: queryDates[i], polyBoundaryQuery };
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
		allCategoriesArray
	};
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

	queryString += categoryQueryString + params.polyBoundaryQuery + dateQueryString;
	// console.log("createQuery: queryString");
	// console.log(queryString);
	return queryString;
};

const polyArrayToString = (polyArray) => {
	// console.log("polyArray.length");
	// console.log(polyArray.length);
	const steps = Math.floor(polyArray.length / 100) + 1;
	// console.log(steps);
	let polyQueryString =
		"poly=" +
		shortenLatLng(polyArray[0].latitude) +
		"," +
		shortenLatLng(polyArray[0].longitude);
	for (let i = 0; i < polyArray.length; i += steps) {
		polyQueryString +=
			":" +
			shortenLatLng(polyArray[i].latitude) +
			"," +
			shortenLatLng(polyArray[i].longitude);
	}
	return polyQueryString;
};

const shortenLatLng = (inputNum) => {
	const desiredLen = 9;
	const inputStr = inputNum.toString();
	return inputStr.length > desiredLen
		? inputStr.slice(0, desiredLen - 1)
		: inputStr;
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
