import { useEffect, useRef } from "react";

export const useBook = (url = 'wss://api-pub.bitfinex.com/ws/2', connect: boolean, level) => {
  const wsRef = useRef<WebSocket | null>(null);

  const connecting = () => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    wsRef.current.onmessage = (event) => {
      setMessage(event.data);
    };

    wsRef.current.onerror = (error) => {
      console.error(`WebSocket error: ${error}`);
    };

    wsRef.current.onclose = (event) => {
      console.log(`WebSocket connection closed with code ${event.code}`);
      if (event.code !== 1000) { // 1000 means normal closure
        console.log('Trying to reconnect...');
        setTimeout(connecting, 1000); // try to reconnect after 1 second
      }
    };
  };

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    if (!connect) {
      // wsRef.current && wsRef.current.close();
      return;
    }
    wsRef.current = new WebSocket(uri);

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
  }, [dispatch, connect, level]);


}