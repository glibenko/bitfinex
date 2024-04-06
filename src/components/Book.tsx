import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import actionTypes from './actionTypes';
import { Select } from '.';

const options = [
  { value: 'P0', label: 'P0' },
  { value: 'P1', label: 'P1' },
  { value: 'P2', label: 'P2' },
  { value: 'P3', label: 'P3' },
  { value: 'P4', label: 'P4' },
];


const Page = ({type}) => {
  const data = useSelector(state => state.book[type]);
  return (
    <table>
    <thead>
      <tr>
        <th>Row</th>
        <th>Type</th>
        <th>Price</th>
        <th>Amount</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={item.price}>
          <td>{index + 1}</td>
          <td>{type}</td>
          <td>{item.price}</td>
          <td>{item.amount}</td>
          <td>{item.count}</td>
        </tr>
      ))}
    </tbody>
  </table>
  )

}

const App = () => {
  const level = useSelector(state => state.level);
  const dispatch = useDispatch();

 return  (
    <>
      <Select />
      {/* <Select value={level} onSelect={(val) => {dispatch({type: actionTypes.LEVEL, payload: val})}}>
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select> */}
      <div style={{display: 'flex'}}>
        <Page type="bid"/>
        <Page type="ask"/>
      </div>
    </>
 )
};
export default App;