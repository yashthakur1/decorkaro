import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Layout from "./components/Layout";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/admin" element={<Admin />} />
				<Route
					path="*"
					element={
						<Layout>
							<Home />
						</Layout>
					}
				/>
			</Routes>
			<Analytics />
		</Router>
	);
}

export default App;
