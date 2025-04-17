1. Add and Remove Items

    React useState: To store and update the list of items.

    React useReducer: To manage the state of the app (like adding or deleting items).

    Event Handlers: For handling the add and delete actions when buttons are clicked.

    LocalStorage: To save items so they persist even after page refresh.

    Error Handling: Alerts are shown if the input is empty or the item already exists.

2. Play the Random Picker

    React useState: To track whether the picker is playing or not (isPlaying).

    React useEffect: To trigger the picking action every few seconds when the picker is playing.

    setInterval/setTimeout: Used to display items one by one at specific intervals, simulating the random picker effect.

    Random Function: A simple JavaScript function to pick a random item from the list.

3. Reset

    React useReducer: We added a RESET action to reset the state of the app.

    LocalStorage: After resetting, we clear the localStorage to remove the saved items.