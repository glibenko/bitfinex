export const ACTION_TYPES = {
  SET: 'SET',
  UPDATE: 'UPDATE',
  CONNECT: 'CONNECT',
  LEVEL: 'LEVEL',
}

export const connect = (isConnect: boolean) => ({
  type: ACTION_TYPES.CONNECT,
  payload: isConnect
});

export const set = (data) => ({
  type: ACTION_TYPES.SET,
  payload: data
});

export const update = (data) => ({
  type: ACTION_TYPES.UPDATE,
  payload: data
});

export const level = (val) => ({
  type: ACTION_TYPES.LEVEL,
  payload: val
});


export type ActionType = ReturnType<typeof connect> | ReturnType<typeof set> | ReturnType<typeof update> | ReturnType<typeof level>;
