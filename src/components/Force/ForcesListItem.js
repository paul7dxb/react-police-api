import { Link } from "react-router-dom";

const ForcesListItem = (props) => {
	const urlLink = "forces/" + props.forceID;

	return (
		<>
			<h3>{props.forceName}</h3>
			<Link to={props.forceID}>View More Info</Link>
			<p>View force data</p>
		</>
	);
};

export default ForcesListItem;
