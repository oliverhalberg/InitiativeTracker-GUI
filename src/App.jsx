import { useRef, useState, useEffect } from 'react'

// Component imports
import Turn from './components/Turn';
import Sidebar from './components/Sidebar';
import AddTurnForm from './components/AddTurnForm';

// Array of Player objects for test purposes
const testPlayers = [
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
  // Index state for iterating through Players state
  const [index, setIndex] = useState(0);

  //useEffect hook to reset the Index state when it goes out of bounds
  useEffect(() => {
    
    if (index === players.length && players.length > 0) {
      //if we've reached the end of the list of turns, reset the index variable and increase the round counter
      setIndex(0);
      setRound(round + 1);
    }
  });

  // Players state
  const [players, setPlayers] = useState(testPlayers); //starts prefilled for testing

  // Round state
  const [round, setRound] = useState(1);

  // Current Turn state
  // const [currentTurn, setCurrentTurn] = useState(0);

  // Ref to generate ids for players
  const nextPlayerId = useRef(4); //FOR TESTING ONLY: STARTS AT 4. FOR AN EMPTY STARTING PLAYER STATE, CHANGE BACK TO 0

  //helper function for sorting the player state
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
    let newId = nextPlayerId.current++;
    let prevIndId = players[index].id;
    //if the player is being added to an empty list, the current turn is that player's turn
    if (players.length === 0) {
      setCurrentTurn(newId);
    }
    setPlayers(prevPlayers => [
      ...prevPlayers,
      {
        name,
        initiative,
        id: newId
      }
    ].sort(compareTurns));
    //handles off-by-one errors when a new turn is added that appears before the current turn in the initiative order
    if (players[index].id !== prevIndId) {
      setIndex(index + 1);
    }
  }

  const handleRemoveTurn = (id) => {
    console.log(`Removed ${id}`); //included for testing
    //get index of removed turn
    let removedIndex = players.findIndex((p) => p.id === id);
    //if the removed turn is the current one, adjust i accordingly
    if (removedIndex === index && removedIndex !== 0) {
      setIndex(index - 1);
    }
    setPlayers(prevPlayers => prevPlayers.filter(p => p.id !== id));
  }

  const handleNextTurn = () => {
    console.log(`previous index: ${players[index].id}`)
    setIndex(index + 1);
    console.log(`current index = ${index}; players length: ${players.length}`);
  }

  return (
    <div>
      <p>Test!</p>
      <div>
        {
          // If there is a list of players, render it
          players ? 
          (players.map(player =>
            <Turn
              name={player.name}
              initiative={player.initiative}
              id={player.id}
              key={player.id.toString()}
              removeTurn={handleRemoveTurn}
              isCurrentTurn={
                index === players.length ? (player.id === players[0].id) : (player.id === players[index].id)
              }
            />
          ))
          : null
        }
        <AddTurnForm addTurn={handleAddTurn}/>
      </div>
      <div>
        <Sidebar
          currentTurnName={players.length > 0 ? (index === players.length ? (players[0].name) : (players[index].name)) : "No turns detected"}
          round={round}
          nextTurn={handleNextTurn}
        />
      </div>
    </div>
  )
}

export default App;
