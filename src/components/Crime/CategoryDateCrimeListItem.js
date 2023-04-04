import classes from "./CategoryDateCrimeListItem.module.css"
import Card from "../UI/Card";

const CategoryDateCrimeListItem = (props) => {

    const streetName = props.streetName ? props.streetName : "No specific location"


    const outcome = props.outcomeStatus ? props.outcomeStatus.category : "No update on outcome"
    const updateDate = props.outcomeStatus ? props.outcomeStatus.date : "No update date"

	return (
		<Card className={classes.myc} >
            <h4 className={classes.crimeTitle}>Crime:</h4>
            <p>Location: {streetName} id: {props.locationID}</p>
            <p>Outcome: {outcome}</p>
            <p>updated: {updateDate}</p> 
		</Card>
	);
};
export default CategoryDateCrimeListItem;
