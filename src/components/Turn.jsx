
const Turn = ( { name, initiative, id, isCurrentTurn, removeTurn, refProp }) => {
    return (
        <div id={`turn${id}`} className={isCurrentTurn ? "turn currentTurn" : "turn"} ref={refProp}>
            <p>{name}</p>
            <p>{initiative}</p>
            <button onClick={() => removeTurn(id)}>X</button>
        </div>
    );
}

export default Turn;