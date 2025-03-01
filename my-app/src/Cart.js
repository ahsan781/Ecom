import React, { useRef } from 'react';

function Example() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Correct use of useRef
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

export default Example;
