import { Link } from "react-router-dom";
import classes from "./LinkButton.module.css"

const LinkButton = ({ url, description }) => {
	return (
		<Link className={classes.linkButton} to={url}>
			{description}
		</Link>
	);
};

export default LinkButton
