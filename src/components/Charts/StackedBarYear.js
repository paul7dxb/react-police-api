import Chart from "react-apexcharts";

const StackedBarYear = (props) => {
	const barChartSeries = props.barChartSeries;
	const barChartLabels = props.barChartLabels;

	console.log("barChartSeries");
	console.log(barChartSeries);

	const horizChartOptions = {
		chart: {
			type: "bar",
			height: 350,
			stacked: true,
			events: {
				xAxisLabelClick: function (event, chartContext, config) {
					// Axis Label selected
					let selectedDate = barChartLabels[config.labelIndex];
					props.onClick({ date: selectedDate });
				},
				dataPointSelection: function (event, chartContext, config) {
					// Specifc Data bar chosen
					let selectedData = barChartLabels[config.dataPointIndex];
					let selectedCategory =
						barChartSeries[config.seriesIndex].name;
					props.onClick({
						date: selectedData,
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
			text: "Most recent data",
		},
		xaxis: {
			categories: barChartLabels,
			labels: {
				formatter: function (val) {
					return val + "";
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
					return val + "";
				},
			},
		},
		fill: {
			opacity: 1,
			// colors:['#F44336', '#E91E63', '#9C27B0']
		},
		legend: {
			position: "top",
			horizontalAlign: "left",
			offsetX: 40,
		},
		colors: [
			"#FF4136",
			"#0074D9",
			"#2ECC40",
			"#FFDC00",
			"#7FDBFF",
			"#FF851B",
			"#B10DC9",
			"#FF4136",
			"#0074D9",
			"#2ECC40",
			"#F012BE",
			"#3D9970",
			"#FFD700",
			"#85144b",
			"#FF7F50",
			"#8B008B",
		],
	};

	return (
		<>
			<Chart
				series={barChartSeries}
				type="bar"
				width="1000"
				options={horizChartOptions}
			/>
		</>
	);
};

export default StackedBarYear;


