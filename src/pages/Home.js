import PageBanner from "../components/UI/PageBanner";
import HomePageItem from "../components/HomePage/HomePageItem";

const homeData = [
	{
		title: "Forces",
		targetPage: "/forces",
		description:
			"Dive into data provided by individual forces in England, Wales and Northern Ireland. Find out about crimes in each forces neighbourhoods over the last 12 months",
	},
	{
		title: "Custom Search",targetPage: "/search",
		description:
			"Use your own parameters to conduct a search and analyze the returned data",
	},
	{
		title: "More Information",targetPage: "/more-info",
		description:
			"Here you will be able to find out more information about the publicly available data, including the privacy of the data that is made available.",
	},
];

const HomePage = () => {
	return (
		<>
			<PageBanner>
				<h1>Home</h1>
				<p>
					This website aims to make the openly available data from
					police forces in England, Wales and Northern Ireland more
					accessable to people.
				</p>
			</PageBanner>
			{homeData.map((item, index) => (
				
				<HomePageItem
					key={item.title}
					rightCard={(index % 2) == 1}
					title={item.title}
					targetPage={item.targetPage}
					description={item.description}
				/>
			))}
		</>
	);
};

export default HomePage;
