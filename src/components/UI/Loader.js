import classes from "./Loader.module.css"

const Loader = (props) => {
	return (
		<div className={classes.loaderContainer}>
			<div className={classes.siren}></div>
			<h2>{props.message}</h2>
		</div>
	);
};

export default Loader
