import Chart from "react-apexcharts";

const BarChartMonth = (props) => {
	const barChartSeries = props.barChartSeries;
	// console.log("barChartSeries");
	// console.log(barChartSeries);
	const barChartLabels = props.barChartLabels;
	// console.log("barChartLabels");
	// console.log(barChartLabels);

	const newData = [{ name: props.date, data: barChartSeries }];

	const chartOptions = {
		chart: {
			type: "bar",
			height: 350,
			events: {
				xAxisLabelClick: function (event, chartContext, config) {
					// Axis Label selected
					// console.log("x axis config");
					// console.log(config);
					let labelIndex = config.labelIndex;
					let selectedCategory = barChartLabels[labelIndex];
					// console.log(selectedCategory);

					props.onClick({
						type: "dataClick",
						date: props.date,
						category: selectedCategory,
					});
				},
				dataPointSelection: function (event, chartContext, config) {
					// Specifc Data bar chosen
					// console.log("data point config")
					// console.log(config)
					let selectedCategory =
						barChartLabels[config.dataPointIndex];
					// console.log(selectedCategory)

					props.onClick({
						type: "dataClick",
						date: props.date,
						category: selectedCategory,
					});
				},
			},
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
			text: "Data for: " + props.date,
		},
		xaxis: {
			categories: barChartLabels,
		},
		fill: {
			opacity: 1,
			// colors:['#F44336', '#E91E63', '#9C27B0']
		},
	};

	return (
		<>
			<Chart
				series={newData}
				type="bar"
				width="1000"
				options={chartOptions}
			/>
		</>
	);
};

export default BarChartMonth;
