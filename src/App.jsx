import { useRef, useState, useEffect } from 'react'

// Component imports
import Turn from './components/Turn';
import Sidebar from './components/Sidebar';
import AddTurnForm from './components/AddTurnForm';
import ThemePicker from './components/ThemePicker';

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

function App({ savedTheme }) {

  // Index state for iterating through turns state
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reset Index state if it goes out of bounds, updating Round state
    if (index === turns.length && turns.length > 0) {
      // If we've reached the end of the list of turns, reset the index variable and increase the round counter
      setIndex(0);
      setRound(round + 1);
    }
    // Scroll to make sure that current turn is within view
    if (turns.length > 0) {
      // Only scroll if turns state has at least one turn in it
      if (index === 0) {
        scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
      else {
        currentTurnRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }
  });

  // Turns state
  const [turns, setTurns] = useState([]);

  // Sorts the Turns state every time it's updated
  useEffect(() => {
    setTurns(prevTurns => prevTurns.sort(compareTurns));
  }, [turns]);

  // Round state
  const [round, setRound] = useState(1);

  // Ref to generate ids for turns
  // Note to self: if using the prefilled test array above as the starting state of the Turns state, 
  // set this to 4 instead of 0
  const nextPlayerId = useRef(0); 

  // For tracking current turn
  const currentTurnRef = useRef();

  // Theme state
  const [theme, setTheme] = useState(savedTheme);

  // When Theme state changes, updates the body class and saves the current theme to persistent storage
  useEffect(() => {
    document.body.className = theme;
    // Writes to disk
    window.dataStoreAPI.saveTheme(theme);
  }, [theme]);

  // Helper function for sorting the Turns state
  const compareTurns = (a, b) => {
    // Data cleaning:
    const aInit = parseInt(a.initiative);
    const bInit = parseInt(b.initiative);
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    if (aInit > bInit) {
      return -1; //a goes first
    }
    else if (aInit < bInit) {
      return 1; //b goes first
    }
    else {
      // If initiative counts are identical, sorts alphabetically by name
      if (aName < bName) {
        return -1;
      }
      else if (aName > bName) {
        return 1;
      }
      else {
        return 0; // This is only reached if both turns are identical.
      }
    }
  }

  const handleAddTurn = (name, initiative) => {
    // Prevents blank turns from being added
    if (name !== '' && initiative !== '') {
      setTurns(prevTurns => [
        ...prevTurns,
        {
          name,
          initiative,
          id: nextPlayerId.current++
        }
      ]);
      setTurns(prevTurns => prevTurns.sort(compareTurns));
    }
  }

  const handleRemoveTurn = (id) => {
    setTurns(prevturns => prevturns.filter(p => p.id !== id));
  }

  const handleNextTurn = () => {
    setIndex(index + 1);
  }

  const handlePreviousTurn = () => {
    if (index > 0) {
      // If index is greater than 0, decrements it
      setIndex(index - 1);
    }
    else {
      // If index is 0, wraps around, decrementing the round (to a minimum of 1)
      setIndex(turns.length - 1);
      if (round >= 2) {
        setRound(round - 1);
      }
    }
  }

  // Helper function to determine whether a Turn component is the current turn
  const isCurrentTurnComponent = (id) => {
    if (index === turns.length) {
      return id === turns[0].id;
    }
    else {
      return id === turns[index].id;
    }
  }

  return (
    <div id="appContainer">
      <div id='appSubContainer'>
        <div id='turnsContainer'>
          {
            // If there is a list of turns, render it as Turn components
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
      <ThemePicker updateTheme={setTheme} />
    </div>
  )
}

export default App;
