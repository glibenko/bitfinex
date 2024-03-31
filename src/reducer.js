import actionTypes from "./actionTypes";
import {v4} from 'uuid';

const initialState = {
  book: {
    bid: [],
    ask: []
  },
  connect: false,
  level: 'P0'
}

const separeteSet = (arr) => {
  const book = {
    bid: [],
    ask: []
  };
  for (const item of arr) {
    // const id = v4();
    const [price, count, amount] = item;
    if (amount > 0) {
      book.bid.push({price, count, amount});
    } else {
      book.ask.push({price, count, amount });
    }
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
        const [price, count, amount] = action.payload;
        const bookType = amount > 0 ? 'bid' : 'ask';
        let book = [...state.book[bookType]];
        const current = book.find(item => item.price === price);

        console.log('current', current && {...current}, count)

        if (current) {
          if (!count) {
            book = book.filter(item => item.price !== price);
          } else {
            current.count = count;
          }
        } else {
          book.push({price, count, amount});
        }

     
      
        // if (index !== -1) {
        //   if (count === 0) {
        //     // remove the item if count is 0
        //     book.splice(index, 1);
        //   } else {
        //     // update the count and amount if the price is the same
        //     book[index].count -= count;
        //     book[index].amount = amount;
        //   }
        // } else {
        //   // add a new item if the price is not in the book
        //   book.push({ price, count, amount });
        // }
      
        return {
          ...state,
          book: {
            ...state.book,
            [bookType]: book
          }
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