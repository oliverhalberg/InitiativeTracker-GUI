const Sidebar = ({ currentTurnName, round, nextTurn, prevTurn }) => {
    return (
        <div>
            <p>Current turn: {currentTurnName}</p>
            <p>Round: {round}</p>
            <button onClick={() => prevTurn()}>Previous Turn</button>
            <button onClick={() => nextTurn()}>Next Turn</button>
        </div>
    );
}

export default Sidebar;