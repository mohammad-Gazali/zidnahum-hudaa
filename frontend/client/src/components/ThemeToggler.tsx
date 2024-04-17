import { useContext } from "react";
import { ThemeContext } from "../context";
import { IconButton } from "../ui";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggler = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};
	return (
		<IconButton className="size-12" onClick={toggleTheme}>
			{theme === "dark" ? (
				<MdLightMode className="size-8" />
			) : (
				<MdDarkMode className="size-8" />
			)}
		</IconButton>
	);
};

export default ThemeToggler;
