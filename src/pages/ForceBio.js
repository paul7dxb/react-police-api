import { useLoaderData, useParams } from "react-router-dom";
import { getAllNeighbourhoods } from "../util/AllNeighbourhoods";
import { getErrorMessageFromResponseCode } from "../util/errorMessages";
import NeighbourhoodList from "../components/Force/NeighbourhoodList";
import PageBanner from "../components/UI/PageBanner";
import Card from "../components/UI/Card";
import classes from "./ForceBio.module.css";

const ForceBio = (props) => {
	const params = useParams();
	const loaderData = useLoaderData();
	const forceData = loaderData.forceData;

	const neighbourhoodData = loaderData.neighbourhoodData;

	// console.log(loaderData.neighbourhoodData)

	if (loaderData.errorMessage) {
		return (
			<>
				<h1>Something Went Wrong</h1>
				<p>{loaderData.errorMessage}</p>
			</>
		);
	}

	if (forceData) {
		const forceURL = forceData.url;
		const forceTele = forceData.telephone;
		const engagementLinks = forceData.engagement_methods;

		let forceTeleOutput = "";
		if (!forceTele) {
			forceTeleOutput =
				"No number provided by database. Use 101 for non-emergency enquiries";
		} else if (forceTele == "101") {
			forceTeleOutput =
				"Only non-emergency enquiries number (101) given by database";
		} else {
			forceTeleOutput = forceTele;
		}

		return (
			<>
				<PageBanner>
					<h1>{forceData.name}</h1>
				</PageBanner>
				<div className={classes.bioContainer}>
					<Card>
						<h2>Telephone</h2>
						<p> {forceTeleOutput} </p>
					</Card>
					<Card>
						<h2>Links</h2>
						<ul>
							<li key="website">
								<span>Website: </span>
								<a href={forceURL}>{forceURL}</a>
							</li>
							{engagementLinks.map((elem) => (
								<li key={elem.title}>
									<span>{elem.title}: </span>
									{elem.url ? (
										<a href={elem.url}>{elem.url}</a>
									) : (
										<span> Data not provided </span>
									)}
								</li>
							))}
						</ul>
					</Card>
				</div>
				<div className={classes.subbanner}>
					<h2>Neighbourhoods</h2>
					<p>{forceData.name} splits its area of responsibility into multiple neighbourhoods listed below. Selecting one will allow you to see in depth details about crime in this neighbourhood</p>
				</div>
				<NeighbourhoodList neighbourhoodData={neighbourhoodData} />
			</>
		);
	}

	return (
		<>
			<h1>Something Went Wrong</h1>
		</>
	);
};

export default ForceBio;

export async function loader({ request, params }) {
	let returnCode = null;
	let forceData = null;
	let neighbourhoodReturn = null;
	let neighbourhoodData = null;

	const id = params.forceID;
	const forceBioResponse = await fetch(
		"https://data.police.uk/api/forces/" + id
	);

	if (!forceBioResponse.ok) {
		returnCode = await forceBioResponse.status;
		return {
			forceData: null,
			errorMessage: getErrorMessageFromResponseCode(String(returnCode)),
		};
	} else {
		forceData = await forceBioResponse.json();

		neighbourhoodReturn = await getAllNeighbourhoods(id);

		if (neighbourhoodReturn.errorMessage) {
			return {
				forceData,
				neighbourhoodData: null,
				errorMessage: neighbourhoodReturn.errorMessage,
			};
		} else {
			neighbourhoodData = neighbourhoodReturn.data;
			return { forceData, neighbourhoodData, errorMessage: null };
		}
	}
}
