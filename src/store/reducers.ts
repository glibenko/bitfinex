import { Book, Price, RootState } from '../types';
import {ACTION_TYPES, ActionType} from './actions';

const initialState: RootState = {
  book: {
    bid: [],
    ask: []
  },
  isConnected: false,
  level: 'P0'
}

const separeteSet = (arr) => {
  const book = {
    bid: [],
    ask: []
  } as Book;
  for (const item of arr) {
    const [price, count, amount] = item;
    if (amount > 0) {
      book.bid.push({price, count, amount});
    } else {
      book.ask.push({price, count, amount });
    }
  }
  return book;
}

const update = (book, [price, count, amount]) => {
  const current = book.find(item => item.price === price);
  if (current) {
    if (!count) {
      book = book.filter(item => item.price !== price);
    } else {
      current.count = count;
    }
  } else {
    book.push({price, count, amount});
  }
  return book;
}

export default function appReducer(state = initialState, action: ActionType): RootState {
  switch (action.type) {
    case ACTION_TYPES.SET:
      return {
        ...state,
        book: separeteSet(action.payload)
      }
      case ACTION_TYPES.UPDATE:
        const current = action.payload;
        const bookType = current.amount > 0 ? 'bid' : 'ask';
        let book = [...state.book[bookType]];

        return {
          ...state,
          book: {
            ...state.book,
            [bookType]: update(book, current)
          }
        }
    case ACTION_TYPES.CONNECT:
      return {
        ...state,
        isConnected: action.payload
      }
    case ACTION_TYPES.LEVEL:
      return {
        ...state,
        level: action.payload
      }
    default:
      return state
  }
}