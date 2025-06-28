import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { TTheme } from "../types/theme";

export const ThemeContext = createContext<
  [TTheme, Dispatch<SetStateAction<TTheme>>] | null
>(null);

interface Props {
  children: ReactNode;
}

export const ThemeContextProvider = (props: Props): JSX.Element => {
  const { children } = props;
  const [theme, setTheme] = useState<TTheme>(
    () => sessionStorage.getItem("theme") as TTheme || "dark"
  );

  useEffect(() => {
    const html = document.documentElement;

    const themeColors =
      theme === "dark"
        ? [
            "#fff",
            "#15202b",
            "#192734",
            "#164d56",
            "#1d6772",
            "#111921",
            "#51929c",
          ]
        : [
            "#000",
            "#eaeaea",
            "#fff",
            "#c1c1c1",
            "#8d897d",
            "#f0ead6",
            "#cecacf",
          ];

    sessionStorage.setItem("theme", theme);
    themeColors.forEach((color, index) => {
      html.style.setProperty(`--color-${index}`, color);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
