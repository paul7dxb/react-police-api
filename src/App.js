import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import TestGroundPage from "./pages/TestGroundPage";
import RootLayout from "./pages/RootLayout";
import Forces from "./pages/Forces";
import ForceBio, {
	loader as forceBioLoader,
} from "./components/Force/ForceBio";
import Neighbourhood from "./pages/Neighbourhood"

//Create router
const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: "forces",
				children: [
					{ index: true, element: <Forces /> },
					{
						path: ":forceID",
						children: [
							{
								index: true,
								loader: forceBioLoader,
								element: <ForceBio />,
							},{
								path: ":neighbourhoodID",
								element: <Neighbourhood/>
							}
						],
					},
				],
			},
			{ path: "testground", element: <TestGroundPage /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
