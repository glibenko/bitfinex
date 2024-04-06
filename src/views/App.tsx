import './App.css';
import { useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import Content from './Content';

// Level of price aggregation (P0, P1, P2, P3, P4).
// The default is P0

function App() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const wsRef = useRef(null);
  console.log(state);


  useEffect(() => {
    const online = () => {
      dispatch({type: actionTypes.CONNECT, payload: true});
    }

    const offline = () => {
      dispatch({type: actionTypes.CONNECT, payload: false});
    }

    document.addEventListener('online', online);
    document.addEventListener('offline', offline);

    return () => {
      document.removeEventListener('online', online);
      document.removeEventListener('offline', offline);
    }

  }, [dispatch]);


  return (
    <div className="App">
      lol
      {/* <Button onClick={() => dispatch({type: actionTypes.CONNECT, payload: !state.connect})}>{!state.connect ? "Connect" : "Disconnect"}</Button>
      <Content /> */}
    </div>
  );
}

export default App;
