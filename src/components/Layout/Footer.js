import { NavLink } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={classes.footer}>
			<nav>
				<ul>
					<li>
						<a href="github">Github</a>
					</li>
					<li>
						<a href="">Contact Developer</a>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default Footer;
