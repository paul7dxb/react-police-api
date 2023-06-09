import Card from "../UI/Card";
import LinkButton from "../UI/LinkButton";
import classes from "./HomePageItem.module.css";
import { Link } from "react-router-dom";

// Props to include rightCard:boolen
const HomePageItem = (props) => {
	const rightCard = props.rightCard;

	if (rightCard) {
		return (
			<div className={classes.sectionContainerReverse}>
				<Card className={classes.rightCard}>
					<Link className={classes.titleLink} to={props.targetPage}>
						{props.title}
					</Link>
					<p>{props.description}</p>
					<LinkButton
						url={props.targetPage}
						description={props.title + " Page"}
					/>
				</Card>
				<img className={classes.imgLeft} src={props.imgSrc} alt={props.imgAlt} />
			</div>
		);
	} else {
		return (
			<div className={classes.sectionContainer}>
				<Card className={classes.leftCard}>
					<Link className={classes.titleLink} to={props.targetPage}>
						{props.title}
					</Link>
					<p>{props.description}</p>
					<LinkButton
						url={props.targetPage}
						description={props.title + " Page"}
					/>
				</Card>
				<img className={classes.imgRight} src={props.imgSrc} alt={props.imgAlt} />
			</div>
		);
	}
};

export default HomePageItem;
