export const polyArrayToString = (polyArray) => {
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