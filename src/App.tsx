// import './App.css';
import React, { useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useBook } from './hooks/useBook';
import { RootState } from './types';
import Book from './components/Book';
import * as actions from './store/actions';
// import Content from './Content';

// Level of price aggregation (P0, P1, P2, P3, P4).
// The default is P0

export function App() {
  const state = useSelector<RootState, RootState>(state => state);
  const dispatch = useDispatch();
  // const wsRef = useRef(null);
  const book = useBook({isConnected: state.isConnected, level: state.level});
  console.log(state);


  useEffect(() => {
    console.log('book', book);

    if (!book) {
      return;
    }


    const data = JSON.parse(book);

      if (!Array.isArray(data)) {
        return;
      }

      const [, values] = data;
      console.log('msg.data', data);

      if (!Array.isArray(values)) {
        return;
      }

      if (values.length === 3) {
        dispatch(actions.updateBook(values));
      } else {
        dispatch(actions.setBook(values));
      }


    // dispatch(actions.setBook(book));

    // dispatch(actions.updateBook(book));
    // const online = () => {
    //   dispatch({type: actionTypes.CONNECT, payload: true});
    // }

    // const offline = () => {
    //   dispatch({type: actionTypes.CONNECT, payload: false});
    // }

    // document.addEventListener('online', online);
    // document.addEventListener('offline', offline);

    // return () => {
    //   document.removeEventListener('online', online);
    //   document.removeEventListener('offline', offline);
    // }

  }, [book, dispatch]);


  return (
    <div className="App">
      lol
      <button onClick={() => dispatch({type: 'CONNECT', payload: !state.isConnected})}>{!state.isConnected ? "Connect" : "Disconnect"}</button>
      {/* <Button onClick={() => dispatch({type: actionTypes.CONNECT, payload: !state.connect})}>{!state.connect ? "Connect" : "Disconnect"}</Button>
      <Content /> */}
      <Book />
    </div>
  );
}
