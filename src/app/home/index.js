import React, {useState, useEffect} from 'react';

export default props => {
  const [state, setstate] = useState ([]);

  const getSpan = async () => {
    await setTimeout (() => {
      setstate (['1', '2', '3']);
    }, 2000);
  };

  useEffect (() => {
    getSpan ();
    return () => {};
  }, []);

  return (
    <div>
      home
      <div>
        {state.map ((item, index) => <span key={item}>{item}</span>)}
      </div>
    </div>
  );
};
