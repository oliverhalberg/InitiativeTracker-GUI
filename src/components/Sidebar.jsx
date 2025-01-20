const Sidebar = ({ currentTurnName, round, nextTurn, prevTurn }) => {
    const prevButtonText = '<< Previous';
    const nextButtonText = 'Next >>'
    return (
        <div>
            <p>Current turn: {currentTurnName}</p>
            <p>Round: {round}</p>
            <button onClick={() => prevTurn()}>{prevButtonText}</button>
            <button onClick={() => nextTurn()}>{nextButtonText}</button>
        </div>
    );
}

export default Sidebar;