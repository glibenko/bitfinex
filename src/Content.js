import React from 'react';
import { Table, Select} from 'antd';
import { useSelector, useDispatch} from 'react-redux';
import actionTypes from './actionTypes';

const options = [
  { value: 'P0', label: 'P0' },
  { value: 'P1', label: 'P1' },
  { value: 'P2', label: 'P2' },
  { value: 'P3', label: 'P3' },
  { value: 'P4', label: 'P4' },
];

const columns = [
  {
    title: 'count',
    key: 'count',
    
    render: (data) => data[1],
  },
  {
    title: 'amount',
    key: 'amount',
    render: (data) => data[2] > 0 ? <span style={{color: 'green'}}>{data[2]}</span> : <span style={{color: 'red'}}>{data[2]}</span>,
  },
  {
    title: 'price',
    key: 'price',
    render: (data) => data[0],
  },
];

const App = () => {
  const book = useSelector(state => state.book);
  const level = useSelector(state => state.level);
  const dispatch = useDispatch();

 return  (
    <>
      <Select value={level} onSelect={(val) => {dispatch({type: actionTypes.LEVEL, payload: val})}}>
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <Table page pagination={false} size="small" virtual rowKey={(item) => item[3]} columns={columns} dataSource={book} />
    </>
 )
};
export default App;