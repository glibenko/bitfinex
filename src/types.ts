export interface Price {
  price: number,
  count: number,
  amount: number
}

export interface Book {
  bid: Price[],
  ask: Price[]
}

export interface RootState {
  book: Book;
  isConnected: boolean;
  level: 'P0' | 'P1' | 'P2' | 'P3' | 'P4'
}