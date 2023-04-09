import classes from "./CategoryDateCrimeListItem.module.css";
import Card from "../UI/Card";

const CategoryDateCrimeListItem = (props) => {

	let streetName = "";
	if (props.streetName) {
        if((props.streetName == "On or near ") && props.locationID){
            streetName = props.streetName + " location ID: " + props.locationID
        } else{
            streetName = props.streetName
        }
	}
    
    if(streetName == ""){
		streetName = "No specific location";
	}

	const outcome = props.outcomeStatus
		? props.outcomeStatus.category
		: "No update on outcome";
	const updateDate = props.outcomeStatus
		? props.outcomeStatus.date
		: "No update date";

	return (
		<Card className={classes.crimeCard}>
			<h4 className={classes.crimeTitle}>{streetName}</h4>
			{/* <p> Location id: {props.locationID} </p> */}
			<p>Last updated: {updateDate}</p>
			<p>Outcome: {outcome}</p>
		</Card>
	);
};
export default CategoryDateCrimeListItem;
