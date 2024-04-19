import { Outlet } from "react-router-dom";
import { Navbar } from "./layout";
import { ThemeProvider } from "./context";

const Root = () => {
	return (
		<ThemeProvider>
			<Navbar />
			<div className="px-3 flex flex-1">
				<Outlet />
			</div>
		</ThemeProvider>
	);
};

export default Root;
