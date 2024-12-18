const Sidebar = ({ currentTurn, round, nextTurn }) => {
    return (
        <div>
            <p>Current turn: {currentTurn}</p>
            <p>Round: {round}</p>
            <button onClick={() => nextTurn()}>Next Turn</button>
        </div>
    );
}

export default Sidebar;