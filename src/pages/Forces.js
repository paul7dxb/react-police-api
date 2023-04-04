import ForcesList from "../components/Force/ForcesList";
import PageBanner from "../components/UI/PageBanner";


const Forces = () => {
	return (
		<>
			<PageBanner>
				<h1>Forces List</h1>
				<p>
					Below is the list of Police Forces in the UK that provide
					data
				</p>
			</PageBanner>
			<ForcesList />
		</>
	);
};

export default Forces;
