import { useLoaderData, useParams } from "react-router-dom";
import { getAllNeighbourhoods } from "../util/AllNeighbourhoods";
import { getErrorMessageFromResponseCode } from "../util/ErrorMessages";
import NeighbourhoodList from "../components/Force/NeighbourhoodList";
import PageBanner from "../components/UI/PageBanner";
import PageSubBanner from "../components/UI/PageSubBanner";
import Card from "../components/UI/Card";
import classes from "./ForceBio.module.css";
import ForceLinks from "../components/Force/ForceLinks";

import { FaPhone as PhoneIcon } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

import Loader from "../components/UI/Loader";

const ForceBio = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [neighbourhoodData, setNeighbourhoodData] = useState([]);
	const [apiError, setapiError] = useState(null);

	const loaderData = useLoaderData();
	const forceData = loaderData.forceData;
	const id = loaderData.id;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const fetchNeighbourhoodListHandler = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await getAllNeighbourhoods(id);
			setNeighbourhoodData(response.data);
			setapiError(response.errorMessage);
		} catch (error) {
			setapiError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchNeighbourhoodListHandler();
	}, [fetchNeighbourhoodListHandler]);

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
						<h2>Telephone:</h2>
						<ul className={classes.ul}>
							<li
								className={classes.engagementListItem}
								key="website"
							>
								<PhoneIcon className={classes.engagementIcon} />
								<span className={classes.linkTitle}>
									{" "}
									{forceTeleOutput}
								</span>
							</li>
						</ul>
					</Card>
					<ForceLinks
						engagementLinks={engagementLinks}
						forceURL={forceURL}
					/>
				</div>

				{isLoading ? (
					<Loader />
				) : (
					<>
						<PageSubBanner>
							<h2>Neighbourhoods</h2>
							<p>
								{forceData.name} splits its area of
								responsibility into multiple neighbourhoods
								listed below. Selecting one will allow you to
								view data about crimes in this neighbourhood
							</p>
						</PageSubBanner>

						<NeighbourhoodList
							neighbourhoodData={neighbourhoodData}
						/>
					</>
				)}
				{apiError ? (
					<>
						<h1>Something Went Getting Neighbourhoods</h1>
						<p>{apiError}</p>
					</>
				) : undefined}
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
		return { forceData, id, errorMessage: null };
	}
}
