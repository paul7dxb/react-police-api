export const convertYearDataToChartSeries = (data, categories) => {
    let keys = {};

    for (let i = 0; i < categories.length; i++) {
		let seriesData = new Array(12).fill(0);
		// series.push({ name: categories[i], data: keys[categories[i]] });
		keys[categories[i]] = seriesData;
	}



	// // Loop through each months data and add to series

	for (let i = 0; i < data.length; i++) {
		for (const property in data[i]) {
			// console.log(`${property}: ${data[i][property]}`);
			keys[property][i] = data[i][property]
		}
	}
    
    let series = [];
	// Create Series Array of 0 values
	for (let i = 0; i < categories.length; i++) {
		// let seriesData = new Array(12).fill(0);
		series.push({ name: categories[i], data: keys[categories[i]] });
		// keys[categories[i]] = seriesData;
	}
    console.log("series")
    console.log(series)

    return series
};
