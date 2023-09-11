import React, { useState } from 'react';

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h2 style={{ display: 'inline' }}>{props.title}placeholder</h2>
      <button style={{ display: 'inline', marginLeft: '20px' }} onClick={toggleDropdown}>V</button>

      {isOpen && (
        <ul>
          <li><a href="#">placeholder</a></li>
          <li><a href="#">placeholder 2</a></li>
          <li><a href="#">placeholder 3</a></li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
