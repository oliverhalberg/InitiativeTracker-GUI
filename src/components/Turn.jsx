const Turn = ({ name, initiative, id, isCurrentTurn, removeTurn, refProp }) => {
    return (
        <div id={`turn${id}`} className={isCurrentTurn ? "turn currentTurn" : "turn"}>
            <div className="turnName">
                <p ref={refProp}>{name}</p>
            </div>
            <div className="turnInitiative">
                <p>{initiative}</p>
            </div>
            <div className="turnBtn">
                <button onClick={() => removeTurn(id)} className="removeTurnButton"><span>x</span></button>
            </div>
        </div>
    );
}

export default Turn;