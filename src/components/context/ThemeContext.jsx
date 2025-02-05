import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = (props) => {
     // Color theme state
    const [theme, setTheme] = useState("default");

      // Updates the theme when it changes
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    /*
    TODO
    useEffect(() => {
        load theme from userdata file, if one exists, and set starting state to that
    }, [])
    */

      return (
        <ThemeContext.Provider value={
            {
                theme,
                setTheme
            }
        }>
            {props.children}
        </ThemeContext.Provider>
      );
}

export default ThemeContext;