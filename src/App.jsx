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

  useEffect(() => {
    setTurns(prevTurns => prevTurns.sort(compareTurns));
  }, [turns]);

  // Round state
  const [round, setRound] = useState(1);

  // Ref to generate ids for turns
  const nextPlayerId = useRef(4); //FOR TESTING ONLY: STARTS AT 4. FOR AN EMPTY STARTING PLAYER STATE, CHANGE BACK TO 0

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
    if (prevIndId !== null) {
      console.log(turns[index].id);
      if (turns[index].id !== prevIndId) {
        setIndex(index + 1);
        console.log("index updated");
      }
    }
    //for testing
    //console.log(`Current ind id: ${turns[index].id}`);
    console.log(turns);
  }

  const handleRemoveTurn = (id) => {
    console.log(`Removed ${id}`); //included for testing
    //get index of removed turn
    let removedIndex = turns.findIndex((p) => p.id === id);
    //if the removed turn is the current one, adjust Index accordingly
    // if (removedIndex === index && removedIndex !== 0) {
    //   setIndex(index - 1);
    // }
    setTurns(prevturns => prevturns.filter(p => p.id !== id));
  }

  const handleNextTurn = () => {
    console.log(`previous index: ${turns[index].id}`)
    setIndex(index + 1);
    console.log(`current index = ${index}; turns length: ${turns.length}`);
  }

  return (
    <div>
      <p>Test!</p>
      <div>
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
                  index === turns.length ? (t.id === turns[0].id) : (t.id === turns[index].id)
                }
              />
            ))
            : null
        }
        <AddTurnForm addTurn={handleAddTurn} />
      </div>
      <div>
        <Sidebar
          currentTurnName={turns.length > 0 ? (index === turns.length ? (turns[0].name) : (turns[index].name)) : "No turns detected"}
          round={round}
          nextTurn={handleNextTurn}
        />
      </div>
    </div>
  )
}

export default App;
