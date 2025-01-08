
const Turn = ( { name, initiative, id, isCurrentTurn, removeTurn, refProp }) => {
    return (
        <div id={`turn${id}`} className={isCurrentTurn ? "turn currentTurn" : "turn"}>
            <p ref={refProp}>{name}</p>
            <p>{initiative}</p>
            <button onClick={() => removeTurn(id)} className="removeTurnButton"><span>x</span></button>
        </div>
    );
}

export default Turn;