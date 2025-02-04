const Sidebar = ({ currentTurnName, round, nextTurn, prevTurn }) => {
    const prevButtonText = '<< Previous';
    const nextButtonText = 'Next >>'
    return (
        <div id='sidebar'>
            <div id='sidebarText'>
                <p>Current turn: {currentTurnName}</p>
                <p>Round: {round}</p>
            </div>
            <div id='turnButtons'>
            </div>
            <button onClick={() => prevTurn()}>{prevButtonText}</button>
            <button onClick={() => nextTurn()}>{nextButtonText}</button>
        </div>
    );
}

export default Sidebar;