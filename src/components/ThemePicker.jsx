const ThemePicker = ({ updateTheme }) => {
    return (
        <div>
            <div id="themePickerOptions" className="themeOptionsContent">
                <button onClick={()=>updateTheme("dark")}>Dark</button>
                <button onClick={()=>updateTheme("light")}>Light</button>
                <button onClick={()=>updateTheme("pink")}>Pink</button>
                <button onClick={()=>updateTheme("forest")}>Forest</button>
                <button onClick={()=>updateTheme("neon")}>Neon</button>
                <button onClick={()=>updateTheme("mint")}>Mint</button>
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