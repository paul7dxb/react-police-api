import Card from "../UI/Card";
import classes from "./HomePageItem.module.css";
import { Link } from "react-router-dom";

// Props to include rightCard:boolen
const HomePageItem = (props) => {
	const rightCard = props.rightCard;

	if (rightCard) {
		return (
			<div className={classes.sectionContainer}>
				<img
					className={classes.imgLeft}
					src="https://paul7dxb.github.io/hosted-assets/PoliceSite/fromeData.png"
					alt=""
				/>
				<Card className={classes.rightCard}>
					<Link className={classes.titleLink} to={props.targetPage}>
						{props.title}
					</Link>
					<p>{props.description}</p>
                    <Link to={props.targetPage}>Go to the {props.title} page</Link>
				</Card>
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
					<Link to={props.targetPage}>Go to the {props.title} page</Link>
				</Card>
				<img className={classes.imgRight}
					src="https://paul7dxb.github.io/hosted-assets/PoliceSite/fromeData.png"
					alt=""
				/>
			</div>
		);
	}
};

export default HomePageItem;
