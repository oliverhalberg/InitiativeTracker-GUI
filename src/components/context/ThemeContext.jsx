import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = (props) => {
     // Color theme state
    
      // TODO: read from userdata file, if one exists, and set starting state to that
      const [theme, setTheme] = useState("default");

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