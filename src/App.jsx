import { useState } from 'react'

function App() {
  // Players state
  const [players, setPlayers] = useState([]);

  // Round state
  const [round, setRound] = useState(1);

  // Current Turn state
  const [currentTurn, setCurrentTurn] = useState(null);

  


  return (
    <div>
      <p>Test!</p>
      <div>
        { /* Turns go here */}
        { /* AddTurnForm */}
      </div>
      <div>
        { /* Sidebar */ }
      </div>
    </div>
  )
}

export default App
