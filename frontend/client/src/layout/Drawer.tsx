import { List, ListItem } from "../ui";
import { routes } from "./NavRoutes";
import { ThemeToggler } from "../components";
import { useNavigate } from "react-router-dom";

interface DrawerProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Drawer = ({ open, setOpen }: DrawerProps) => {
	const navigate = useNavigate();

	return (
		<>
			<aside
				className={`md:hidden z-30 fixed bg-surface-container p-4 inset-y-0 rounded-l-2xl w-80 transition-transform duration-500 ${
					open ? "translate-x-0" : "translate-x-80"
				}`}
			>
				<ThemeToggler />
				<List className="bg-surface-container">
					{routes.map((route) => (
						<ListItem
							type="button"
							className="rounded-full"
							onClick={() => {
								navigate(route.link);
								setOpen(false);
							}}
							key={route.name}
						>
							{<route.icon className="size-6" slot="start" />}
							{route.name}
						</ListItem>
					))}
				</List>
			</aside>
			<div
				className={`md:hidden z-20 bg-overlay inset-0 fixed cursor-pointer ${
					open ? "block" : "hidden"
				}`}
				onClick={() => setOpen(false)}
			/>
		</>
	);
};

export default Drawer;
