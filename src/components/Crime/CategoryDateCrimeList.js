import CategoryDateCrimeListItem from "./CategoryDateCrimeListItem";
import classes from "./CategoryDateCrimeList.module.css";
import { useState } from "react";

const CategoryDateCrimeList = (props) => {
	const date = props.params.date;
	const category = props.params.category;

	const [crimeLocFilter, setcrimeLocFilter] = useState("");


	const data = props.catDateData.data;
	return (
		<>
			<input
				className={classes.crimeLocFilterInput}
				id="filter"
				name="filter"
				type="text"
				placeholder="Filter Crime Location"
				// value={filter}
				onChange={(event) =>
					setcrimeLocFilter(event.target.value.toUpperCase())
				}
			/>
			<div className={classes.crimeListContainer}>
				{data
					? data
					.filter((elem) =>
								(elem.location.street.name.toUpperCase().includes(crimeLocFilter) || elem.location.street.id.toString().toUpperCase().includes(crimeLocFilter))
							)
					.map((item, index) => {
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
		</>
	);
};

export default CategoryDateCrimeList;
