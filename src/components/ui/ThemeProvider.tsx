import { Theme, ThemeProviderState } from "@/types/theme.types"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { createContext, useContext, useEffect, useReducer } from "react"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useReducer(
    (_: Theme, next: Theme) => {
      localStorage.setItem(storageKey, next)
      return next;
    },
    (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    let unlisten: (() => void) | undefined;

    (async () => {
      if (theme !== "system") return root.classList.add(theme);
      const systemTheme = (await getCurrentWindow().theme()) ?? "dark";
      root.classList.add(systemTheme);

      unlisten = await getCurrentWindow().onThemeChanged(({ payload }) => {
        root.classList.remove("light", "dark");
        root.classList.add(payload ?? "dark");
      });
    })();

    return () => unlisten?.();
  }, [theme]);


  return (
    <ThemeProviderContext.Provider {...props} value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  else
    return context;
}