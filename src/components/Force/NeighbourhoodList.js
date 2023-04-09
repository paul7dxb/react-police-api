import { Link, useParams } from "react-router-dom";
import classes from "./NeighbourhoodList.module.css";
import { useState } from "react";

const NeighbourhoodList = (props) => {
	const neighbourhoodData = props.neighbourhoodData;
	const params = useParams();
	const [neighbourhoodFilter, setNeighbourhoodFilter] = useState("");


	return (
		<>
			<input
				className={classes.neighbourhoodFilterInput}
				id="filter"
				name="filter"
				type="text"
				placeholder="Filter Neighbourhood"
				// value={filter}
				onChange={(event) =>
					setNeighbourhoodFilter(event.target.value.toUpperCase())
				}
			/>
			<div className={classes.neighbourhoodListContainer}>
				{neighbourhoodData
					? neighbourhoodData
							.filter((elem) =>
								elem.name
									.toUpperCase()
									.includes(neighbourhoodFilter)
							)
							.map((elem) => (
								<Link
									className={classes.linkCard}
									key={elem.id}
									to={elem.id}
								>
									{elem.name}
								</Link>
							))
					: undefined}
			</div>
		</>
	);
};

export default NeighbourhoodList;
