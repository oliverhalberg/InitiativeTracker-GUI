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

function App({ message }) {

  //test code for passing information from main to renderer process
  console.log(message);

  // Index state for iterating through turns state
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reset Index state if it goes out of bounds, updating Round state
    if (index === turns.length && turns.length > 0) {
      //if we've reached the end of the list of turns, reset the index variable and increase the round counter
      setIndex(0);
      setRound(round + 1);
    }
    // Scroll to make sure that current turn is within view
    if (turns.length > 0) {
      //only scroll if turns state has at least one turn in it
      if (index === 0) {
        scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
      else {
        currentTurnRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }
  });

  // Turns state
  // const [turns, setTurns] = useState(testTurns); //starts prefilled for testing
  const [turns, setTurns] = useState([]);

  // Sorts the Turns state every time it's updated
  useEffect(() => {
    setTurns(prevTurns => prevTurns.sort(compareTurns));
    // console.log(turns);
  }, [turns]);

  // Round state
  const [round, setRound] = useState(1);

  // Ref to generate ids for turns
  const nextPlayerId = useRef(0); //FOR TESTING ONLY: STARTS AT 4. FOR AN EMPTY STARTING PLAYER STATE, CHANGE BACK TO 0

  // For tracking current turn
  const currentTurnRef = useRef();


  const [theme, setTheme] = useState();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);



  //helper function for sorting the Turns state
  const compareTurns = (a, b) => {
    //data cleaning:
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
      //initiative counts are identical, sort alphabetically by name
      if (aName < bName) {
        return -1;
      }
      else if (aName > bName) {
        return 1;
      }
      else {
        return 0; //this is only reached if both turns are identical.
      }
    }
  }

  const handleAddTurn = (name, initiative) => {
    let prevIndId = null; //used only for tracking during testing at this point, but I'm leaving it in
    //if the Turn is being added to a non-empty array, save the id of the current turn for later comparison
    if (turns.length !== 0) {
      prevIndId = turns[index].id;
      // console.log(`Previous ind id: ${prevIndId}`);
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
    // CURRENT PLAN: This isn't a bug, but I can try to fix it if the beta testers view it as such.
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
  }

  const handlePreviousTurn = () => {
    if (index > 0) {
      //If index is greater than 0, decrements it
      setIndex(index - 1);
    }
    else {
      //If index is 0, wraps around, decrementing the round (to a minimum of 1)
      setIndex(turns.length - 1);
      if (round >= 2) {
        setRound(round - 1);
      }
    }
  }

  //helper function to determine whether a Turn component is the current turn
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
      <ThemePicker updateTheme={setTheme}/>
    </div>
  )
}

export default App;
