import { useState } from 'react'

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
  // Players state
  const [players, setPlayers] = useState([]);

  // Round state
  const [round, setRound] = useState(1);

  // Current Turn state
  const [currentTurn, setCurrentTurn] = useState(null);


  // placeholder
  const handleRemoveTurn = (id) => {
    console.log(`Removed ${id}`);
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
            isCurrentTurn={player.initiative === currentTurn}
          />
        )}
        { /* AddTurnForm */}
      </div>
      <div>
        { /* Sidebar */ }
      </div>
    </div>
  )
}

export default App
