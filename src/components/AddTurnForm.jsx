import { useRef } from 'react';

const AddTurnForm = ({ addTurn }) => {
    //Refs for user inputs
    const nameInput = useRef();
    const initiativeInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        addTurn(nameInput.current.value, initiativeInput.current.value);
        event.currentTarget.reset();
    }

    return (
        <div id="addTurnFormContainer">
            <form onSubmit={(event) => handleSubmit(event)} id='addTurnForm'>
                <input
                    type='text'
                    ref={nameInput}
                    placeholder='Enter name'
                />
                <input
                    type='number'
                    ref={initiativeInput}
                    placeholder='Initiative'
                />
                <input
                    type='submit'
                    value="Add Turn"
                />
            </form>
        </div>
    );
}

export default AddTurnForm;