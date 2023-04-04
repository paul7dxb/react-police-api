const CategoryDateCrimeList = (props) => {
	const date = props.params.date;
	const category = props.params.category;

	console.log("catDateData in list comp");
	console.log(props.catDateData);

	const data = props.catDateData.data;
	return (
		<>
			<h1>{category} crime during {date}</h1>
			<ul>
				{data
					? data.map((item, index) => {
							return (<li>
                                Location: {item.location.street.name} - 
                                Outcome: {item.outcome_status.category}
                                
                                </li>);
					  })
					: undefined}
			</ul>
		</>
	);
};

export default CategoryDateCrimeList;
