
const Turn = ( { name, initiative, id, isCurrentTurn, removeTurn }) => {
    return (
        <div className={isCurrentTurn ? "currentTurn" : null}>
            <p>{name}</p>
            <p>{initiative}</p>
            <button onClick={() => removeTurn(id)}>X</button>
        </div>
    );
}

export default Turn;