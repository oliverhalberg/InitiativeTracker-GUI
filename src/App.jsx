import { useRef, useState } from 'react'

// Component imports
import Turn from './components/Turn';

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
  // Index variable for iterating through Players state
  const i = 0;

  // Players state
  const [players, setPlayers] = useState([]);

  // Round state
  const [round, setRound] = useState(1);

  // Current Turn state
  const [currentTurn, setCurrentTurn] = useState(null);

  // Ref to generate ids for players
  const nextPlayerId = useRef(0);

  //helper function for sorting the player state
  const compareTurns = (a, b) => {
    if(a.initiative < b.initiative){
      return -1; //a goes first
    }
    else if(a.initiative > b.initiative){
      return 1; //b goes first
    }
    else{
      //initiative counts are identical, sort alphabetically by name
      if(a.name < b.name){
        return -1;
      }
      else if(a.name > b.name){
        return 1;
      }
      else{
        return 0; //this is only reached if both turns are identical.
      }
    }
  }

  const handleAddTurn = (name, initiative) => {
    newId = nextPlayerId.current++;
    //if the player is being added to an empty list, the current turn is that player's turn
    if(players.length === 0) {
      currentTurn = newId;
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
    if(players[i].id !== currentTurn){
      i++;
    }
  }

  const handleRemoveTurn = (id) => {
    console.log(`Removed ${id}`); //included for testing
    //get index of removed turn
    removedIndex = players.findIndex( (p) => p.id === id);
    //if the removed turn is the current one, adjust i accordingly
    if (removedIndex === i){
      i = i-1;
    }
    setPlayers(prevPlayers => prevPlayers.filter(p => p.id !== id));
  }

  const handleNextTurn = () => {
    i++;
    if (i >= players.length) {
      //if we've reached the end of the list of turns, reset the index variable and increase the round counter
      i = 0;
      setRound(round + 1);
    }
    currentTurn = players[i].id;
  }


  return (
    <div>
      <p>Test!</p>
      <div>
        { /* Turns go here */
          testPlayers.map(player =>
            <Turn
              name={player.name}
              initiative={player.initiative}
              id={player.id}
              key={player.id.toString()}
              removeTurn={handleRemoveTurn}
              isCurrentTurn={player.id === currentTurn}
            />
          )}
        { /* AddTurnForm */}
      </div>
      <div>
        { /* Sidebar */}
      </div>
    </div>
  )
}

export default App
