import CategoryDateCrimeListItem from "./CategoryDateCrimeListItem";
import classes from "./CategoryDateCrimeList.module.css"

const CategoryDateCrimeList = (props) => {
	const date = props.params.date;
	const category = props.params.category;

	console.log("catDateData in list comp");
	console.log(props.catDateData);

	const data = props.catDateData.data;
	return (
		<div className={classes.crimeListContainer}>
			{data
				? data.map((item, index) => {
						return (
							<CategoryDateCrimeListItem
								key={index}
								streetName={item.location.street.name}
								outcomeStatus={item.outcome_status}
								locationID={item.location.street.id}
							/>
						);
				  })
				: undefined}
		</div>
	);
};

export default CategoryDateCrimeList;
