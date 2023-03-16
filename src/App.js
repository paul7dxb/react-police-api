import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home';
import TestGroundPage from './pages/TestGroundPage';

//Create router
const router = createBrowserRouter([
  {path: '/', element: <HomePage />},
  {path: '/testground', element: <TestGroundPage />}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
