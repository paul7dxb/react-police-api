import classes from "./CategoryDateCrimeListItem.module.css"


const CategoryDateCrimeListItem = (props) => {

    const streetName = props.streetName ? props.streetName : "No specific location"


    const outcome = props.outcomeStatus ? props.outcomeStatus.category : "No update on outcome"
    const updateDate = props.outcomeStatus ? props.outcomeStatus.date : "No update date"

	return (
		<li>
            <h4 className={classes.crimeTitle}>Crime:</h4>
            <p>Location: {streetName} id: {props.locationID}</p>
            <p>Outcome: {outcome}</p>
            <p>updated: {updateDate}</p> 
		</li>
	);
};
export default CategoryDateCrimeListItem;
