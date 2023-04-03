import Chart from "react-apexcharts";

const StackedBarYear = (props) => {
	const barChartSeries = props.barChartSeries;
	const barChartLabels = props.barChartLabels;

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
		},
		legend: {
			position: "top",
			horizontalAlign: "left",
			offsetX: 40,
		},
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
