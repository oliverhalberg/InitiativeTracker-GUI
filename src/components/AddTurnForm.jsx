import { useRef, useState } from 'react';

const AddTurnForm = ({ addTurn }) => {
    //refs for user inputs
    const nameInput = useRef();
    const initiativeInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        addTurn(nameInput.current.value, initiativeInput.current.value);
        console.log(`${nameInput.current.value}: ${initiativeInput.current.value}`); //for testing
        event.currentTarget.reset();
    }

    return (
        <div id="addTurnFormContainer">
            <form onSubmit={(event) => handleSubmit(event)} id='addTurnForm'>
                <input
                    type='text'
                    ref={nameInput}
                    placeholder='Enter name'
                    id='addTurnFormNameInput'
                />
                <input
                    type='number'
                    ref={initiativeInput}
                    placeholder='Initiative'
                    id='addTurnFormInitiativeInput'
                />
                <input
                    type='submit'
                    value="Add Turn"
                    id='addTurnFormSubmit'
                />
            </form>
        </div>
    );
}

export default AddTurnForm;