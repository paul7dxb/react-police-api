import { NavLink } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={classes.footer}>
			<nav>
				<ul>
					<li>
						<a href="https://github.com/paul7dxb/react-police-api">Source Code</a>
					</li>
					<li>
						<a href="https://paulmck.dev/contact">Contact The Developer</a>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default Footer;
