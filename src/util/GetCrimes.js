import { getErrorMessageFromResponseCode } from "./errorMessages";

export const getCrimesSummary = async (params) => {
	const apiQuery = createQuery(params);
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

			return { summaryData, errorMessage };
		} else {
			return {
				data: null,
				errorMessage: getErrorMessageFromResponseCode(returnCode),
			};
		}
	} catch (error) {
		return {
			data: null,
			errorMessage: getErrorMessageFromResponseCode(error.message),
		};
	}
};

const createQuery = (params) => {
	const categoryParam = params.category ? params.category : null;
	const polyBoundaryArrayParam = params.polyBoundary
		? params.polyBoundary
		: null;
	const dateParam = params.date ? params.date : null;

	let queryString = "https://data.police.uk/api/crimes-street/";

	let categoryQueryString = "";
	if (categoryParam) {
		categoryQueryString = categoryParam + "?";
	} else {
		categoryQueryString = "all-crime?";
	}

	let polyBoundaryQuery = "";
	if (polyBoundaryArrayParam.length > 0) {
		polyBoundaryQuery = polyArrayToString(polyBoundaryArrayParam);
		// console.log(polyBoundaryQuery);
	}

	let dateQueryString = "&";
	if (dateParam) {
		dateQueryString += "date=" + dateParam;
	}

	queryString += categoryQueryString + polyBoundaryQuery + dateQueryString;
	// console.log(queryString);
	return queryString;
};

const polyArrayToString = (polyArray) => {
	// console.log(polyArray.length);
	let polyQueryString =
		"poly=" +
		shortenLatLng(polyArray[0].latitude) +
		"," +
		shortenLatLng(polyArray[0].longitude);
	for (let i = 0; i < polyArray.length; i++) {
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
	// let crimesArr = [];

	let totalCrimeTally = 0;

	for (const key in crimeDataArray) {
		// count category totals
		if (crimes[crimeDataArray[key].category]) {
			crimes[crimeDataArray[key].category] += 1;
		} else {
			crimes[crimeDataArray[key].category] = 1;
		}

		totalCrimeTally++;
	}
	// console.log("totalled");
	// console.log(crimes);
	const crimesArr = Object.keys(crimes).map((key) => [key, crimes[key]]);

	return { categoryTotals: crimesArr, totalCrime: totalCrimeTally };
};
