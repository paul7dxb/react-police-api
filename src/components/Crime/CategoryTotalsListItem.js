const CategoryTotalListItem = (props) => {
	const summaryData = props.summaryData;

	return (
		<>
			<h3>Total Crime {summaryData.totalCrime}</h3>
			{summaryData.categoryTotals.map((elem) => (
				<p key={elem[0]}>
					{elem[0]} : {elem[1]}
				</p>
			))}
		</>
	);
};

export default CategoryTotalListItem;
