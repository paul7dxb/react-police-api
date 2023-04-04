import CategoryDateCrimeListItem from "./CategoryDateCrimeListItem";

const CategoryDateCrimeList = (props) => {
	const date = props.params.date;
	const category = props.params.category;

	console.log("catDateData in list comp");
	console.log(props.catDateData);

	const data = props.catDateData.data;
	return (
		<>

			<ul>
				{data
					? data.map((item, index) => {
							return (
								<CategoryDateCrimeListItem key={index}
									streetName={item.location.street.name}
									outcomeStatus={item.outcome_status}
                                    locationID={item.location.street.id}
								/>
							);
					  })
					: undefined}
			</ul>
		</>
	);
};

export default CategoryDateCrimeList;
