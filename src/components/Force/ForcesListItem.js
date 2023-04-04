import { Link } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./ForcesListItem.module.css"

const ForcesListItem = (props) => {
	const urlLink = "forces/" + props.forceID;

	return (
		// <Card className={classes.linkCard}>
			<Link className={classes.linkCard} to={props.forceID}>{props.forceName}</Link>
		// {/* </Card> */}
	);
};

export default ForcesListItem;
