import { useState } from "react";
import TestNavBar from "../components/TestNavbar";

const TestGroundPage = () => {
	const [showNav, setShowNav] = useState(false);

	// const toggleNavItems = () => {
	// 	setShowNav(!showNav);
	// };

	return (
		<>
			<h1>Test page</h1>
			<TestNavBar />
		</>
	);
};

export default TestGroundPage;
