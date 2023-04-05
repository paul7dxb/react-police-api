import Card from "../UI/Card";
import classes from "./MoreInfoPageItem.module.css";
import { Link } from "react-router-dom";

// Props to include rightCard:boolen
const MoreInfoPageItem = (props) => {
	const rightCard = props.rightCard;

	return (
			<Card className={rightCard ? classes.rightCard : classes.leftCard}>
				<Link className={classes.titleLink} to={props.targetPage}>
					{props.title}
				</Link>
				<p>{props.description}</p>
			</Card>
	);
};

export default MoreInfoPageItem;
