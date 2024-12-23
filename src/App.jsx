import { useRef, useState, useEffect } from 'react'

// Component imports
import Turn from './components/Turn';
import Sidebar from './components/Sidebar';
import AddTurnForm from './components/AddTurnForm';

// Array of Turn objects for test purposes
const testTurns = [
  {
    name: "Bech",
    initiative: 20,
    id: 0
  },
  {
    name: "Talia",
    initiative: 13,
    id: 1
  },
  {
    name: "Harper",
    initiative: 12,
    id: 2
  },
  {
    name: "Caden",
    initiative: 6,
    id: 3
  }
];

function App() {
  // Index state for iterating through turns state
  const [index, setIndex] = useState(0);

  //useEffect hook to reset the Index state when it goes out of bounds
  useEffect(() => {
    if (index === turns.length && turns.length > 0) {
      //if we've reached the end of the list of turns, reset the index variable and increase the round counter
      setIndex(0);
      setRound(round + 1);
    }
  });

  // Turns state
  const [turns, setTurns] = useState(testTurns); //starts prefilled for testing

  // Sorts the Turns state every time it's updated
  useEffect(() => {
    setTurns(prevTurns => prevTurns.sort(compareTurns));
  }, [turns]);

  // Round state
  const [round, setRound] = useState(1);

  // Ref to generate ids for turns
  const nextPlayerId = useRef(4); //FOR TESTING ONLY: STARTS AT 4. FOR AN EMPTY STARTING PLAYER STATE, CHANGE BACK TO 0

  // For tracking current turn
  const currentTurnRef = useRef();

  //helper function for sorting the Turns state
  const compareTurns = (a, b) => {
    if (a.initiative > b.initiative) {
      return -1; //a goes first
    }
    else if (a.initiative < b.initiative) {
      return 1; //b goes first
    }
    else {
      //initiative counts are identical, sort alphabetically by name
      if (a.name > b.name) {
        return -1;
      }
      else if (a.name < b.name) {
        return 1;
      }
      else {
        return 0; //this is only reached if both turns are identical.
      }
    }
  }

  const handleAddTurn = (name, initiative) => {
    let prevIndId = null;
    //if the Turn is being added to a non-empty array, save the id of the current turn for later comparison
    if (turns.length !== 0) {
      prevIndId = turns[index].id;
      console.log(`Previous ind id: ${prevIndId}`);
    }
    setTurns(prevTurns => [
      ...prevTurns,
      {
        name,
        initiative,
        id: nextPlayerId.current++
      }
    ]);
    setTurns(prevTurns => prevTurns.sort(compareTurns));
    //handles off-by-one errors when a new turn is added that appears before the current turn in the initiative order
    //NOTE: Is this an error? That is desired behavior before the first round. So maybe this correcting only occurs if
    // the user has clicked "Next Turn" at least once? (boolean state isRunning updated to True once clicked, never set to False)
    //Next step is to get the correction to actually work
    //Best fix is probably to implement a "previous turn" button and not to correct unless beta testers want it. Gives users more flexibility.
    // if (prevIndId !== null) {
    //   console.log(turns[index].id);
    //   if (turns[index].id !== prevIndId) {
    //     setIndex(index + 1);
    //     console.log("index updated");
    //   }
    // }
    //for testing
    // console.log(`Current ind id: ${turns[index].id}`);
    // console.log(turns);
  }

  const handleRemoveTurn = (id) => {
    // console.log(`Removed ${id}`); //included for testing
    setTurns(prevturns => prevturns.filter(p => p.id !== id));
  }

  const handleNextTurn = () => {
    // console.log(`previous index: ${turns[index].id}`)
    setIndex(index + 1);
    // console.log(`current index = ${index}; turns length: ${turns.length}`);
    currentTurnRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  const handlePreviousTurn = () => {
    if (index > 0){
      //If index is greater than 0, decrements it
      setIndex(index - 1);
    }
    else {
      //If index is 0, wraps around without incrementing or decrementing the round state
      setIndex(turns.length - 1);
    }
  }

  //helper function to determine whether a Turn component is the current turn
  const isCurrentTurnComponent = (id) => {
    if(index === turns.length){
      return id === turns[0].id;
    }
    else{
      return id === turns[index].id;
    }
  }

  return (
    <div id='appContainer'>
      <div id='turnsContainer'>
        {
          // If there is a list of turns, render it
          turns ?
            (turns.map(t =>
              <Turn
                name={t.name}
                initiative={t.initiative}
                id={t.id}
                key={t.id.toString()}
                removeTurn={handleRemoveTurn}
                isCurrentTurn={
                  isCurrentTurnComponent(t.id)
                }
                refProp={
                  isCurrentTurnComponent(t.id) ? currentTurnRef : null}
              />
            ))
            : null
        }
      </div>
      <div id='sidebarContainer'>
        <Sidebar
          currentTurnName={turns.length > 0 ? (index === turns.length ? (turns[0].name) : (turns[index].name)) : "No turns detected"}
          round={round}
          nextTurn={handleNextTurn}
          prevTurn={handlePreviousTurn}
        />
        <AddTurnForm addTurn={handleAddTurn} />
      </div>
    </div>
  )
}

export default App;
