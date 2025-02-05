import ThemeContext from "./context/ThemeContext";
import { useContext } from "react";

const ThemePicker = () => {

    const {theme, setTheme} = useContext(ThemeContext);

    return (
        <div>
            <div id="themePickerOptions" className="themeOptionsContent">
                <p onClick={setTheme("default")}>Default</p>
            </div>
            <button onClick={()=> {document.getElementById("themePickerOptions").classList.toggle("show")}}>Change Theme</button>
        </div>
    );
}

export default ThemePicker;