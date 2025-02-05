import ThemeContext from "./context/ThemeContext";
import { useContext } from "react";

const ThemePicker = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div>
            <div id="themePickerOptions" className="themeOptionsContent">
                <p onClick={setTheme("default")}>Default</p>
                <p>filler</p>
                <p>More filler</p>
                <p>More filler</p>
                <p>Yet more filler text</p>
            </div>
            <button id="themePickerButton"
                onClick={() => { document.getElementById("themePickerOptions").classList.toggle("show") }}
            >
                Change Theme
            </button>
        </div>
    );
}

export default ThemePicker;