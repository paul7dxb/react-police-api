import { useState } from "react";
import CategoryTotalListItem from "./CategoryTotalsListItem";

const CategoryTotalList = (props) => {

    const [yearSummaryData, setYearSummaryData] = useState(props.yearSummaryData)

	console.log("inlist");
	// console.log(yearSummaryData);
	// console.log(yearSummaryData[0]);
	console.log(yearSummaryData[0].data.totalCrime);


	return (
		<>
			<p>Some stuf</p>
			{yearSummaryData
				? yearSummaryData.map(({data, errorMessage}) => (
						<CategoryTotalListItem summaryData={data} errorMessage={errorMessage}/>
                        // <p>Jiib data</p>
                ))
				: undefined}


			{/* {yearSummaryData ? yearSummaryData.map((elem) => (
				<p> {elem.data.totalCrime}  </p>
			)) : undefined} */}
		</>
	);
};

export default CategoryTotalList;
