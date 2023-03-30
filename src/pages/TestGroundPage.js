import { useCallback, useEffect, useState } from "react";
import Chart from "react-apexcharts";

const TestGroundPage = () => {
	const state = {
		options: {
			chart: {
				id: "basic-bar",
			},
			xaxis: {
				categories: [
					1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
				],
			},
		},
		series: [
			{
				name: "series-1",
				data: [30, 40, 45, 50, 49, 60, 70, 91],
			},
		],
	};

	const horizSeries = [
		{
			name: "Marine Sprite",
			data: [44, 55, 41, 37, 22, 43, 21],
		},
		{
			name: "Striking Calf",
			data: [53, 32, 33, 52, 13, 43, 32],
		},
		{
			name: "Tank Picture",
			data: [12, 17, 11, 9, 15, 11, 20],
		},
		{
			name: "Bucket Slope",
			data: [9, 7, 5, 8, 6, 9, 4],
		},
		{
			name: "Reborn Kid",
			data: [25, 12, 19, 32, 25, 24, 10],
		},
	];

	const horizChartOptions = {
		chart: {
			type: "bar",
			height: 350,
			stacked: true,
		},
		plotOptions: {
			bar: {
				horizontal: true,
				dataLabels: {
					total: {
						enabled: true,
						offsetX: 0,
						style: {
							fontSize: "13px",
							fontWeight: 900,
						},
					},
				},
			},
		},
		stroke: {
			width: 1,
			colors: ["#fff"],
		},
		title: {
			text: "Fiction Books Sales",
		},
		xaxis: {
			categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
			labels: {
				formatter: function (val) {
					return val + "K";
				},
			},
		},
		yaxis: {
			title: {
				text: undefined,
			},
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val + "K";
				},
			},
		},
		fill: {
			opacity: 1,
		},
		legend: {
			position: "top",
			horizontalAlign: "left",
			offsetX: 40,
		},
	};

	return (
		<>
			<h1>TestGround</h1>
			<Chart
				options={state.options}
				series={state.series}
				type="bar"
				width="500"
			/>
			<Chart
				series={horizSeries}
				type="bar"
				width="1000"
				options={horizChartOptions}
			/>
		</>
	);

	// const [policeData, setData] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);
	// const [categoryTotals, setCategoryTotals] = useState([]);
	// const [totalCrime, setTotalCrime] = useState(0);

	// const fetchPoliceDataHandler = useCallback(async () => {
	// 	setIsLoading(true);
	// 	setError(null);
	// 	try {
	// 		const response = await fetch(
	// 			"https://data.police.uk/api/crimes-street/all-crime?poly=50.348010,-4.186085:50.414103,-4.208948:50.411820,-4.086455:50.357098,-4.093174&date=2022-08"
	// 			// "https://data.police.uk/api/crimes-street/all-crime?poly=51.048424,-5.764221:51.227468,1.499355:50.810961,2.483187:49.583288,-6.094256&date=2022-08"
	// 		);
	// 		if (!response.ok) {
	// 			throw new Error("Something went wrong!");
	// 		}

	// 		const data = await response.json();

	// 		console.log(data);

	// 		const loadedData = [];

	// 		let crimes = {};
	// 		let crimesArr = [];
	// 		let totalCrimeTally = 0;

	// 		//   Get desired data from response
	// 		for (const key in data) {
	// 			loadedData.push({
	// 				id: data[key].id,
	// 				category: data[key].category,
	// 				street: data[key].location.street,
	// 			});

	// 			// count category totals
	// 			if (crimes[data[key].category]) {
	// 				crimes[data[key].category] += 1;
	// 			} else {
	// 				crimes[data[key].category] = 1;
	// 			}

	// 			totalCrimeTally++;
	// 		}

	// 		crimesArr = Array.from(crimes);

	// 		console.log(loadedData);
	// 		setData(loadedData);
	// 		setTotalCrime(totalCrimeTally);
	// 		//   console.log("categoryTotals")
	// 		//   console.log(categoryTotals)
	// 		//   console.log(crimes)

	// 		crimesArr = Object.keys(crimes).map((key) => [key, crimes[key]]);
	// 		setCategoryTotals(crimesArr);

	// 		console.log(crimesArr);
	// 	} catch (error) {
	// 		setError(error.message);
	// 	}
	// 	setIsLoading(false);
	// }, []);

	// useEffect(() => {
	// 	fetchPoliceDataHandler();
	// }, [fetchPoliceDataHandler]);

	// return (
	// 	<>
	// 		<h1>Test Ground</h1>
	// 		<iframe
	// 			width="600"
	// 			height="450"
	// 			loading="lazy"
	// 			src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAV4QQVrpv-3R69ZT1bQ4fBvRa1O_RH8G8&q=Space+Needle,Seattle+WA"
	// 		></iframe>
	// 		<h1>Test Ground</h1>
	// 		<h3>{totalCrime}</h3>
	// 		<p>Start of data</p>
	// 		{categoryTotals.map((elem) => (
	// 			<p key={elem[0]}>
	// 				{elem[0]} : {elem[1]}
	// 			</p>
	// 		))}
	// 		<p>End of data</p>
	// 	</>
	// );
};

export default TestGroundPage;
