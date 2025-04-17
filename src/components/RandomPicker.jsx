import React, { useReducer, useState, useEffect } from 'react';

const initialState = {
  items: [],
  isPlaying: false,
  result: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, items: [...state.items, action.payload] };
    case 'DELETE':
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload)
      };
    case 'PLAY':
      return { ...state, isPlaying: true, result: '' };
    case 'PICK':
      return { ...state, isPlaying: false, result: action.payload };
    case 'RESET':
      return { items: [], isPlaying: false, result: '' };
    default:
      return state;
  }
}

export default function RandomPicker() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');
  const [displayedItem, setDisplayedItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      alert('no input');
      return;
    }
    if (state.items.includes(trimmed)) {
      alert('item already exists');
      return;
    }
    dispatch({ type: 'ADD', payload: trimmed });
    setInput('');
  };

  const handleDelete = (item) => {
    dispatch({ type: 'DELETE', payload: item });
  };

  const handlePlay = () => {
    if (state.items.length < 2) {
      alert('minimum 2 items required to play');
      return;
    }
    dispatch({ type: 'PLAY' });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  useEffect(() => {
    let intervalId;
    let timeoutId;

    if (state.isPlaying) {
      let index = 0;
      intervalId = setInterval(() => {
        setDisplayedItem(state.items[index]);
        index = (index + 1) % state.items.length;
      }, 100);

      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        const randomItem =
          state.items[Math.floor(Math.random() * state.items.length)];
        dispatch({ type: 'PICK', payload: randomItem });
      }, 2500);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [state.isPlaying, state.items]);

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="heading">
          {state.isPlaying
            ? displayedItem
            : state.result
            ? `${state.result} `
            : 'Add a name and let me pick a winner for you!'}
        </h2>

        {!state.isPlaying && (
          <>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter item"
                className="input"
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>

            <ul className="item-list">
              {state.items.map((item, index) => (
                <li key={index} className="item">
                  <span>{item}</span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item)}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>

            <div className="button-group">
              <button
                className="play-btn"
                onClick={handlePlay}
                disabled={state.items.length < 2}
              >
                Play
              </button>
              <button className="reset-btn" onClick={handleReset}>
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
