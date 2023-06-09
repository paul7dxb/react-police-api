import Card from "../components/UI/Card";
import LinkButton from "../components/UI/LinkButton";

import classes from "./NotFoundPage.module.css";

const NotFoundPage = () => {
	return (
		<div className={classes.notFoundDiv}>
			<img
				className={classes.notFoundImage}
				src="https://paul7dxb.github.io/hosted-assets/PoliceSite/police404.png"
				alt="Police with stop sign drawing"
			/>
			<Card className={classes.notFoundCard}>
				<h2 className={classes.cardTitle}>Page not found</h2>
				<LinkButton url="/" description="Escort me back to safety"  />
			</Card>
		</div>
	);
};

export default NotFoundPage;
