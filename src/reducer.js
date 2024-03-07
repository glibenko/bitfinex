import actionTypes from "./actionTypes";
import {v4} from 'uuid';

const initialState = {
  book: [],
  connect: false,
  level: 'P0'
}

const separeteSet = (arr) => {
  const book = [];
  for (const item of arr) {
      book.push([...item, v4()]);
  }
  return book;
}

export default function appReducer(state = initialState, action) {
  console.log('action', action, state.book.length)
  switch (action.type) {
    case actionTypes.SET:
      return {
        ...state,
        book: separeteSet(action.payload)
      }
    case actionTypes.UPDATE:
      console.log('state.book', state.book);
        const [_first, ...rest] = [...state.book];
        rest.push([...action.payload, v4()]);
        return {
        ...state,
        book: rest
        }
    case actionTypes.CONNECT:
      return {
        ...state,
        connect: action.payload
      }
    case actionTypes.LEVEL:
      return {
        ...state,
        level: action.payload
      }
    default:
      return state
  }
}