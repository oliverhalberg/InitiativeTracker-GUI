const Sidebar = ({ currentTurnName, round, nextTurn, prevTurn }) => {
    const prevButtonText = '<< Previous';
    const nextButtonText = 'Next >>'
    return (
        <div>
            <p>Current turn: {currentTurnName}</p>
            <p>Round: {round}</p>
            <div id='turnButtons'>
                <button onClick={() => prevTurn()}>{prevButtonText}</button>
                <button onClick={() => nextTurn()}>{nextButtonText}</button>
            </div>
        </div>
    );
}

export default Sidebar;