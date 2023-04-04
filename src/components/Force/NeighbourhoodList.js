import { Link, useParams } from "react-router-dom";
import classes from "./NeighbourhoodList.module.css";

const NeighbourhoodList = (props) => {
	const neighbourhoodData = props.neighbourhoodData;
	const params = useParams();

	console.log(params);

	return (
		<div className={classes.neighbourhoodListContainer}>
			{neighbourhoodData
				? neighbourhoodData.map((elem) => (
						<Link className={classes.linkCard} key={elem.id} to={elem.id}>
							{elem.name}
						</Link>
				  ))
				: undefined}
		</div>
	);
};

export default NeighbourhoodList;
