import './App.css';
import { useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import actionTypes from './actionTypes';
import Content from './Content';
import {Button} from 'antd';

// Level of price aggregation (P0, P1, P2, P3, P4).
// The default is P0

function App() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const wsRef = useRef(null);
  console.log(state);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    if (!state.connect) {
      // wsRef.current && wsRef.current.close();
      return;
    }
    wsRef.current = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    wsRef.current.onmessage = (msg) => {
      console.log(msg);

      if (!msg.data ) {
        return;
      }

      const data = JSON.parse(msg.data);

      if (!Array.isArray(data)) {
        return;
      }

      const [_channelId, values] = data;
      console.log('msg.data', data);

      if (!Array.isArray(values)) {
        return;
      }

      if (values.length === 3) {
        dispatch({type: actionTypes.UPDATE, payload: values});
      } else {
        dispatch({type: actionTypes.SET, payload: values});
      }
      
    }

    let msg = JSON.stringify({ 
      event: 'subscribe', 
      channel: 'book', 
      symbol: 'tBTCUSD',
      prec: state.level,
    })
    wsRef.current.onopen = () => wsRef.current.send(msg);
    wsRef.current.onerror = (err) => console.log(err);

    return () => wsRef.current.close();
  }, [dispatch, state.connect, state.level]);

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
      <Button onClick={() => dispatch({type: actionTypes.CONNECT, payload: !state.connect})}>{!state.connect ? "Connect" : "Disconnect"}</Button>
      <Content />
    </div>
  );
}

export default App;
