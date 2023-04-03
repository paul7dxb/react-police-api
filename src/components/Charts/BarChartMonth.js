import Chart from "react-apexcharts";

const BarChartMonth = (props) => {
	const barChartSeries = props.barChartSeries;
    console.log("barChartSeries")
    console.log(barChartSeries)
	const barChartLabels = props.barChartLabels;
    console.log("barChartLabels")
    console.log(barChartLabels)

    const newData = [{name: props.date , data: barChartSeries}]



	const horizChartOptions = {
        // series: [{data: barChartSeries}],
		chart: {
			type: "bar",
			height: 350,
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
			text: ("Data for: " + props.date),
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
				options={horizChartOptions}
			/>
		</>
	);
};

export default BarChartMonth;
