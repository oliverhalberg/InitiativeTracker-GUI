
const ThemePicker = ({ updateTheme }) => {

    return (
        <div>
            <div id="themePickerOptions" className="themeOptionsContent">
                <button onClick={()=>updateTheme("default")}>Default</button>
                <button onClick={()=>updateTheme("test")}>blue</button>
                <button onClick={()=>updateTheme("pink")}>Pink</button>
                <button>More filler</button>
                <button>Yet more filler text</button>
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