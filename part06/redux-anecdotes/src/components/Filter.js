import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(filterChange(e.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};
