import { useRef, useState } from "react";
import Card from "../UI/Card";
import classes from "./CustomSearchInput.module.css";
import { getUserLocation } from "../../util/location/Location";

const CustomSearchInput = ({ searchFormSubmitted }) => {
	const latLngStep = 0.000001;

	const latitudeInput = useRef();
	const longitudeInput = useRef();
	const radiusInput = useRef();

	const [latitudeInputValue, setLatitudeInputValue] = useState(0);
	const [longitudeInputValue, setLongitudeInputValue] = useState(0);
	const [radiusInputValue, setRadiusInputValue] = useState(0);
	const [fetchingLocation, setFetchingLocation] = useState(false);

	const searchFormHandler = (event) => {
		event.preventDefault();
		const inputLat = latitudeInput.current.value;
		const inputLng = longitudeInput.current.value;
		const inputRadius = radiusInput.current.value;
		// Validate inputs

		searchFormSubmitted({ inputLat, inputLng, inputRadius });
	};

	const getLocationHandler = () => {
		console.log("get location");
		setFetchingLocation(true);
		const myLocation = getUserLocation(successLocation, errorLocation);
		console.log(myLocation);
	};
	const successLocation = (position) => {
		console.log("position");
		console.log(position.coords);
		setLatitudeInputValue(position.coords.latitude);
		setLongitudeInputValue(position.coords.longitude);
		setFetchingLocation(false);
	};
	const errorLocation = (error) => {
		console.log("error getting location");
		console.log(error);
		setFetchingLocation(false);
	};

	return (
		<Card>
			<h3>Set Parameters for the search</h3>
			<form className={classes.form} onSubmit={searchFormHandler}>
				<div className={classes.formInputs}>
					<div className={classes.formField}>
						<span>Latitude: </span>
						<input
							ref={latitudeInput}
							value={latitudeInputValue}
							onChange={(event) =>
								setLatitudeInputValue(event.target.value)
							}
							type="number"
							step={latLngStep}
						/>
					</div>
					<div className={classes.formField}>
						<span>Longtiude: </span>
						<input
							ref={longitudeInput}
							value={longitudeInputValue}
							onChange={(event) =>
								setLongitudeInputValue(event.target.value)
							}
							type="number"
							step={latLngStep}
						/>
					</div>
					<div className={classes.formField}>
						<span>Search Radius (km): </span>
						<input
							ref={radiusInput}
							value={radiusInputValue}
							min={0.01}
							onChange={(event) =>
								setRadiusInputValue(event.target.value)
							}
							type="number"
							step="0.01"
						/>
					</div>
				</div>{" "}
				<button type="button"
					onClick={getLocationHandler}
					disabled={fetchingLocation}
				>
					{fetchingLocation ? "Fetching Location" : "Use Your Location"}
				</button>
				<button>Search</button>
			</form>
		</Card>
	);
};

export default CustomSearchInput;
