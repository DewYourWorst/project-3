import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Ranking() {
  const [data, setData] = useState(null);
  const [year, setYear] = useState(2023); 
  const [season, setSeason] = useState('regular'); 
  const [week, setWeek] = useState(1); 
  const [searchYear, setSearchYear] = useState(2023); 
  const [searchWeek, setSearchWeek] = useState(1); 

  const fetchData = async () => {
    try {
      const response = await fetch(`/cfb-api/rankings?year=${year}&week=${week}`);
      if (!response.ok) {
        throw new Error(`server status ${response.status}`);
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('error fetching data', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year, season, week]);

  const handleYearChange = (e) => {
    const inputValue = e.target.value;
    console.log('Year input value:', inputValue);
    if (inputValue === '' || !isNaN(inputValue)) {
      setSearchYear(inputValue === '' ? '' : parseInt(inputValue));
    }
  };

  const handleWeekChange = (e) => {
    const inputValue = e.target.value;
    console.log('Week input value:', inputValue);
    if (inputValue === '' || !isNaN(inputValue)) {
      setSearchWeek(inputValue === '' ? '' : parseInt(inputValue));
    }
  };

  const handleFetchClick = () => {
    setYear(searchYear === '' ? 2023 : searchYear); 
    setWeek(searchWeek === '' ? 1 : searchWeek); 
  };

  return (
    <div>
      <h2>National Rankings</h2>

      <div>
        <label>Year:</label>
        <input
          type="number"
          id="year"
          value={searchYear}
          onChange={handleYearChange}
        />
      </div>
      <div>
        <label>Week:</label>
        <input
          type="number"
          id="week"
          value={searchWeek}
          onChange={handleWeekChange}
        />
      </div>

      <button onClick={handleFetchClick}>Search!</button>

      {data &&
        data[0].polls
          .filter((poll) => poll.poll === 'AP Top 25' || poll.poll === 'Coaches Poll')
          .map((poll) => (
            <div key={poll.poll}>
              <h3>{poll.poll}</h3>
              <ul>
                {poll.ranks.map((rank) => (
                  <li key={rank.school}>
                    <div>
                      <p>
                        <Link to={`/team/${rank.school}`}>{rank.school}</Link>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
    </div>
  );
}

export default Ranking;
