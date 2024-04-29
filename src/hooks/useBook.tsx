import { useCallback, useEffect, useRef, useState } from "react";

export const useBook = ({url = 'wss://api-pub.bitfinex.com/ws/2', isConnected = false, level = 'P0'}) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [book, setBook] = useState();

  const connecting = useCallback(() => {
    console.log('connecting...');

    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      console.log('WebSocket connection opened');

      let msg = JSON.stringify({ 
        event: 'subscribe', 
        channel: 'book', 
        symbol: 'tBTCUSD',
        prec: level,
      })

      wsRef.current?.send(msg);
    };

    wsRef.current.onmessage = (msg) => {
      // setMessage(event.data);
      console.log(msg);

      if (!msg.data ) {
        return;
      }

      setBook(msg.data);

      // const data = JSON.parse(msg.data);

      // if (!Array.isArray(data)) {
      //   return;
      // }

      // const [_channelId, values] = data;
      // console.log('msg.data', data);

      // if (!Array.isArray(values)) {
      //   return;
      // }

      // setBook(values);

      // if (values.length === 3) {
      //   dispatch({type: actionTypes.UPDATE, payload: values});
      // } else {
      //   dispatch({type: actionTypes.SET, payload: values});
      // }
    };

    wsRef.current.onerror = (error) => {
      console.error(`WebSocket error: ${error}`);
    };

    wsRef.current.onclose = (event) => {
      console.log(`WebSocket connection closed with code ${event.code}`);
      if (event.code !== 1000 && isConnected) { // 1000 means normal closure
        console.log('Trying to reconnect...');
        setTimeout(connecting, 1000); // try to reconnect after 1 second
      }
    };
  }, [url, level, isConnected]);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close(1000);
    }

    if (isConnected) {
      connecting();
    }

    // if (!connect) {
    //   // wsRef.current && wsRef.current.close();
    //   return;
    // }
    // wsRef.current = new WebSocket(url);

    // wsRef.current.onmessage = (msg) => {
    //   console.log(msg);

    //   if (!msg.data ) {
    //     return;
    //   }

    //   const data = JSON.parse(msg.data);

    //   if (!Array.isArray(data)) {
    //     return;
    //   }

    //   const [_channelId, values] = data;
    //   console.log('msg.data', data);

    //   if (!Array.isArray(values)) {
    //     return;
    //   }

    //   if (values.length === 3) {
    //     dispatch({type: actionTypes.UPDATE, payload: values});
    //   } else {
    //     dispatch({type: actionTypes.SET, payload: values});
    //   }
      
    // }

    // let msg = JSON.stringify({ 
    //   event: 'subscribe', 
    //   channel: 'book', 
    //   symbol: 'tBTCUSD',
    //   prec: state.level,
    // })
    // wsRef.current.onopen = () => wsRef.current.send(msg);
    // wsRef.current.onerror = (err) => console.log(err);

    return () => wsRef.current?.close(1000);
  }, [connecting, isConnected]);


  return book;
}