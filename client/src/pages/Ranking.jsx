import React, { useEffect, useState } from 'react';
import { ListComponent } from '../components';
import { fetchCollegeFootballRankings } from '../test';

function Ranking() {
  const [rankings, setRankings] = useState([]);
  const [weekNumber, setWeekNumber] = useState(1); 
  const [year, setYear] = useState(2023); 

  const handleWeekNumberChange = (event) => {
    setWeekNumber(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const fetchData = async () => {
    try {
      const data = await fetchCollegeFootballRankings(weekNumber, year);
      setRankings(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <div>
      <h1>Ranking Page</h1>
      <div>
        <label>Week Number:</label>
        <input
          type="number"
          id="weekNumber"
          value={weekNumber}
          onChange={handleWeekNumberChange}
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={handleYearChange}
        />
      </div>
      <button onClick={fetchData}>Fetch Data</button>
      {rankings.map((pollData, index) => (
        <div key={index}>
          <h2>{pollData.poll}</h2>
          <ListComponent title={pollData.poll} items={pollData.ranks} />
        </div>
      ))}
    </div>
  );
}

export default Ranking;
