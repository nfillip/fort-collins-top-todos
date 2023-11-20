import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Sunset from './pages/Sunset.jsx'
import Profile from './pages/Profile.jsx'
import Bars from './pages/Bars.jsx'
import Views from './pages/Views.jsx'
import Restaurants from './pages/Restaurants.jsx'
import Saved from './pages/Saved.jsx'
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "sunset",
				element: <Sunset />
			},
			{
				path: "bars",
				element: <Bars />
			},
			{
				path: "views",
				element: <Views />
			},
			{
				path: "restaurants",
				element: <Restaurants />
			},
			{
				path: "profile",
				element: <Profile />
			},
			{
				path: "saved",
				element: <Saved />
			},

		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
