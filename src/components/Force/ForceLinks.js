import Card from "../UI/Card";
import MediaIcon from "../Icons/MediaIcon";
import { BsGlobe as WebIcon } from "react-icons/bs";
import classes from "./ForceLinks.module.css";

const ForceLinks = ({ engagementLinks, forceURL }) => {
	console.log(engagementLinks);

	return (
		<Card>
			<h2>Links:</h2>
			<ul>
				<li className={classes.engagementListItem} key="website">
					<WebIcon className={classes.engagementIcon} />
					<span className={classes.linkTitle}> Website: </span>
					<a href={forceURL}>{forceURL}</a>
				</li>
				{engagementLinks.map((elem) => (
					<li className={classes.engagementListItem} key={elem.title}>
						<MediaIcon icon={elem.type} />
						<span className={classes.linkTitle} > {elem.title}: </span>
						{elem.url ? (
							<a href={elem.url} target="_blank">
								{elem.url}
							</a>
						) : (
							<span> Data not provided </span>
						)}
					</li>
				))}
			</ul>
		</Card>
	);
};

export default ForceLinks;
