const Sidebar = ({ currentTurnName, round, nextTurn }) => {
    return (
        <div>
            <p>Current turn: {currentTurnName}</p>
            <p>Round: {round}</p>
            <button onClick={() => nextTurn()}>Next Turn</button>
        </div>
    );
}

export default Sidebar;