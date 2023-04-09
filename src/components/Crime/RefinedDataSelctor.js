import classes from "./RefinedDataSelctor.module.css"

const RefinedDataSelctor = ({
	dateOptions,
	dateSelectedHandler,
	selectedValue,
}) => {
	if (!selectedValue) {
		selectedValue = 0;
	}

	return (
		<>
			<label>Select a month to view:</label>
			<select name="dateSelector" onChange={dateSelectedHandler} defaultValue={'DEFAULT'} className={classes.dateDropdown}>
				{selectedValue == 0 ? (
					<option disabled value="DEFAULT">
						Select an option
					</option>
				) : (
					<option disabled value="DEFAULT">
						Select an option
					</option>
				)}

				{dateOptions.map((elem) => {
					if (selectedValue == elem) {
						return (
							<option key={elem} selected value="elem">
								{elem}
							</option>
						);
					} else {
						return (
							<option key={elem} value="elem">
								{elem}
							</option>
						);
					}
				})}
			</select>
		</>
	);
};
export default RefinedDataSelctor;
