import ForcesList from "../components/Force/ForcesList";
import PageBanner from "../components/UI/PageBanner";


const Forces = () => {
	return (
		<>
			<PageBanner>
				<h1>Forces List</h1>
				<p>
					Below is the list of Police Forces in the England, Wales & Northern Ireland have provided
					their data to the Governement's publicly accessible database. Click on any of the forces below to find out more about a specific force.
				</p>
			</PageBanner>
			<ForcesList />
		</>
	);
};

export default Forces;
