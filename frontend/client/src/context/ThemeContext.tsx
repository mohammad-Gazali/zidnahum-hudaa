import { ReactNode, createContext, useEffect, useState } from "react";

export const ThemeContext = createContext<{
    theme: "dark" | "light";
    setTheme: (theme: "dark" | "light") => void;
}>({
    theme: "light",
    setTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<"dark" | "light">("light");

	useEffect(() => {
		const theme = localStorage.getItem("theme");

		if (theme === "dark") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}, []);

    const value = {
        theme,
        setTheme: (theme: "dark" | "light") => {
            setTheme(theme);
            localStorage.setItem("theme", theme);
            if (theme === "dark") {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
        }
    }

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

interface ThemeProviderProps {
	children: ReactNode;
}
