import { createContext, useContext } from 'react';

export const ThemeContext = createContext({ theme: 'dark', toggle: () => {} });

// { theme: 'dark' | 'light', toggle(origin?) } from ThemeProvider
export default function useTheme() {
    return useContext(ThemeContext);
}
