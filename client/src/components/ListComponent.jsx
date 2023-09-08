import React, { useState } from 'react';

function ListComponent({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {title}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {items.map((pollData, index) => (
            <li key={index}>
              <h3>{pollData.poll}</h3>
              {pollData.ranks.map((ranking, rankingIndex) => (
                <div key={rankingIndex}>
                  <strong>Rank: {ranking.rank}</strong>
                  <div>School: {ranking.school}</div>
                  <div>Conference: {ranking.conference}</div>
                  <div>First Place Votes: {ranking.firstPlaceVotes}</div>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListComponent;
