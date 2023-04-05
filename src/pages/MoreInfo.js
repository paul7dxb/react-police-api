import PageBanner from "../components/UI/PageBanner";
import Card from "../components/UI/Card";
const MoreInfo = () => {
	return (
		<>
			<PageBanner>
				<h1>More Information</h1>
			</PageBanner>
			<Card>
				<h2>General Information</h2>
				<p>
					There are known issues with some of the provided data being
					inaccurate.
				</p>
				<p>
					You can check results against known discrepancies by
					checking the known issues page on the data.police.uk website: <a href='https://data.police.uk/changelog/'>https://data.police.uk/changelog/</a>
				</p>
                <p>Data is made available under the <a href='https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'>Open Government License v3.0.</a></p>
			</Card>
            <Card>
                <h2>Privacy of Data</h2>
                <p>Data is anonymised before publication to the publicly accessible database. This includes:</p>
                <ul>
                    <li>Hashing Crime ID references</li>
                    <li>Stripping dates that include a day of the month they occured. Crimes are only identified to the month and year they occured.</li>
                    <li>Location anonymisation. Published crime locations represent the approximate location of a crime — not the exact place that it happened.</li>
                </ul>
                <p>Find more information on the anonymisation of data here: <a href="https://data.police.uk/about/#anonymisation">https://data.police.uk/about/#anonymisation</a></p>
            </Card>
            <Card>
                <h2>More Resources</h2>
                <p>The annual data requirement (ADR) is a list of all requests for data made to all police forces in England and Wales under the Home Secretary’s statutory powers and is used to report crime and policing related statistics.</p>
            <p>Links to publications can be found at <a href="https://data.police.uk/data/statistical-data/">https://data.police.uk/data/statistical-data/</a></p> 
            </Card>
            <Card>
                <h2>Traffic Limits</h2>
                <p>Access to the police data API is free and is controlled using a algorithm that, in short, allows an average of 15 requests per second from a user but up to 30 requests for a single second.</p>
                <p>More information can be found at: <a href="https://data.police.uk/docs/api-call-limits/">https://data.police.uk/docs/api-call-limits/</a></p> 
            </Card>
		</>
	);
};

export default MoreInfo;
