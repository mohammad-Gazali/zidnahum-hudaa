import { MdMenu } from "react-icons/md";
import { useContext, useState } from "react";
import { ThemeContext } from "../context";
import { FilledButton, IconButton } from "../ui/button";
import Drawer from "./Drawer";
import { routes } from "./NavRoutes";
import { ThemeToggler } from "../components";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const { theme } = useContext(ThemeContext);
	const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

	return (
		<>
			<nav className="bg-surface-container px-3 py-4 sticky flex items-center">
				<img
					className="size-12"
					src={theme === "dark" ? "logo-dark.svg" : "logo.svg"}
					alt="logo"
				/>
				<div className="flex-1" />
				<div className="md:flex hidden items-center gap-4">
					{routes.map((route) => (
						<FilledButton onClick={() => navigate(route.link)} key={route.name}>
							{<route.icon slot="icon" />}
							{route.name}
						</FilledButton>
					))}
					<ThemeToggler />
				</div>
				<IconButton
					className="size-12 md:hidden"
					onClick={() => setDrawerOpen(true)}
				>
					<MdMenu className="size-8" />
				</IconButton>
			</nav>
			<Drawer open={drawerOpen} setOpen={setDrawerOpen} />
		</>
	);
};

export default Navbar;
