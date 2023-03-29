import { Link, useParams } from "react-router-dom";

const NeighbourhoodList = (props) => {
	const neighbourhoodData = props.neighbourhoodData;
	const params = useParams();

	console.log(params);

	return (
		<ul>
			{neighbourhoodData.map((elem) => (
				<li key={elem.id}>
					<Link to={elem.id}>{elem.name}</Link>
				</li>
			))}
		</ul>
	);
};

export default NeighbourhoodList;
