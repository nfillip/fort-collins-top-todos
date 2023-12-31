import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Sunset from './pages/Sunset.jsx'
import Profile from './pages/Profile.jsx'
import Bars from './pages/Bars.jsx'
import Hikes from './pages/Hikes.jsx'
import Restaurants from './pages/Restaurants.jsx'
import Saved from './pages/Saved.jsx'
import Community from "./pages/Community.jsx"
import Chat from "./pages/Chat.jsx"
import Error from "./pages/Error.jsx"
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
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
				path: "hikes",
				element: <Hikes />
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
			{
				path: "community",
				element: <Community />
			},
			{
				path: "chat",
				element: <Chat />
			},
			{
				path: "error",
				element: <Error />
			},

		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
