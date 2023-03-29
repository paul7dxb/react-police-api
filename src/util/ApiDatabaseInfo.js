import { getErrorMessageFromResponseCode } from "./errorMessages";

export const getLastUpdated = async () => {
	let errorMessage = null;
	let data = null;
	let returnCode = null;
	try {
		const response = await fetch(
			"https://data.police.uk/api/crime-last-updated"
		);
		if (!response.ok) {
			throw new Error(response.status);
		}

		returnCode = await response.status;
		if (returnCode === 200) {
			data = await response.json();
			// console.log(data);
			const fullDate = data.date;
			const trimedDate = fullDate.slice(0, 7);
			const trimedYear = fullDate.slice(0, 4);
			const trimedMonth = fullDate.slice(5, 7);

			return {
				data: { year: trimedYear, month: trimedMonth },
				errorMessage,
			};
		} else {
			return {
				data: null,
				errorMessage: getErrorMessageFromResponseCode(returnCode),
			};
		}
	} catch (error) {
		console.log(error);
		return {
			data: null,
			errorMessage: getErrorMessageFromResponseCode(error.message),
		};
	}
};

export const getLastYear = async () => {
	const monthsArr = ["01", "02","03","04","05","06","07","08","09","10","11","12"]
	const lastDate = await getLastUpdated();
	let curMonth = lastDate.data.month;
	let curMonthIndex = monthsArr.indexOf(curMonth)
	console.log(curMonthIndex)

	let curYear = lastDate.data.year;

	let queryDates = [];

	for (let i = 0; i < 12; i++) {
		queryDates.push(curYear + "-" + curMonth);

		curMonthIndex--
		if(curMonthIndex < 0){
			curMonthIndex += 12
			curYear = String(parseInt(curYear) -1)
		}
		curMonth = monthsArr[curMonthIndex]
		// console.log(curMonth)
	}

	// console.log(queryDates)
	return queryDates

};
