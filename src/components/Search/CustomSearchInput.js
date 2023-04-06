import { useRef } from "react";
import Card from "../UI/Card";
import classes from "./CustomSearchInput.module.css";

const CustomSearchInput = ({ searchFormSubmitted }) => {

    const latLngStep = 0.000001;

	const latitudeInput = useRef();
	const longitudeInput = useRef();
	const radiusInput = useRef();

	const searchFormHandler = (event) => {
        event.preventDefault()
        const inputLat = latitudeInput.current.value
        const inputLng = longitudeInput.current.value
        const inputRadius = radiusInput.current.value
        // Validate inputs

        searchFormSubmitted({inputLat, inputLng, inputRadius})


	};

	return (
		<Card>
			<h3>Set Parameters for the search</h3>
			<form className={classes.form} onSubmit={searchFormHandler}>
				<div className={classes.formInputs}>
					<div className={classes.formField}>
						<span>Latitude: </span>
						<input ref={latitudeInput} type="number" step={latLngStep} />
					</div>
					<div className={classes.formField}>
						<span>Longtiude: </span>
						<input ref={longitudeInput} type="number" step={latLngStep} />
					</div>
					<div className={classes.formField}>
						<span>Search Radius (km): </span>
						<input ref={radiusInput} type="number" step="0.1" />
					</div>
				</div>
				<button>Search</button>
			</form>
		</Card>
	);
};

export default CustomSearchInput;
