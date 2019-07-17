import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

//redux
import {fetchData} from '../../redux';

export default props => {
  const state = useSelector (state => state);
  const dispatch = useDispatch ();

  useEffect (() => {
    fetchData () (dispatch);
    return () => {};
  }, []);

  return (
    <div>
      home
      <div>
        {/* {state.map ((item, index) => <span key={item}>{item}</span>)} */}
        {state.data.map ((item, index) => (
          <div key={item.circuitId}>{item.circuitId}</div>
        ))}
      </div>
    </div>
  );
};
