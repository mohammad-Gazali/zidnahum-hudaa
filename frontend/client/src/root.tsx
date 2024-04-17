import { Outlet } from "react-router-dom";
import { Navbar } from "./layout";
import { ThemeProvider } from "./context";

const Root = () => {
	return (
		<ThemeProvider>
			<Navbar />
			<Outlet />
		</ThemeProvider>
	);
};

export default Root;
