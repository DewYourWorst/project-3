import React, { useState } from 'react';

function Team() {
  const [gameData, setGameData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [teamName, setTeamName] = useState('Alabama');
  const [year, setYear] = useState(2023);

  const fetchData = async () => {
    try {
      setStatsData(null);
  
      const gameResponse = await fetch(`/cfb-api/games?year=${year}&teamName=${teamName}`);
      if (!gameResponse.ok) {
        throw new Error(`Server status ${gameResponse.status}`);
      }
      const gameData = await gameResponse.json();
  
      const statsResponse = await fetch(`/cfb-api/stats?year=${year}&teamName=${teamName}`);
      if (!statsResponse.ok) {
        throw new Error(`Server status ${statsResponse.status}`);
      }
      const statsData = await statsResponse.json();
  
      setGameData(gameData);
      setStatsData(statsData);
    } catch (error) {
      console.error('Error fetching data', error.message);
    }
  };
  

  const filterStatsData = () => {
    if (!statsData) return [];

    const highestStatsByCategory = new Map();

    for (const stats of statsData) {
      const category = stats.category;
      const statType = stats.statType;
      const statValue = stats.stat;

      if (!highestStatsByCategory.has(category) || statValue > highestStatsByCategory.get(category).stat) {
        highestStatsByCategory.set(category, { stat: statValue, players: [stats] });
      } else if (statValue === highestStatsByCategory.get(category).stat) {
        highestStatsByCategory.get(category).players.push(stats);
      }
    }

    const filteredStats = [];
    for (const categoryData of highestStatsByCategory.values()) {
      filteredStats.push(...categoryData.players);
    }

    return filteredStats;
  };

  const handleFetchDataClick = () => {
    fetchData();
  };

  const handleTeamNameChange = (e) => {
    const inputValue = e.target.value;
    console.log('Team input value', inputValue);
    setTeamName(inputValue);
  };

  const handleYearChange = (e) => {
    const inputValue = e.target.value;
    console.log('Year input value:', inputValue);
    setYear(inputValue);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const title = gameData
    ? `${teamName}'s ${gameData[0].season} ${gameData[0].seasonType} season games`
    : 'Search for a team';

  const filteredStatsData = filterStatsData();

  return (
    <div>
      <h1>{title}</h1>
      <label>Team Name: </label>
      <input
        type="text"
        value={teamName}
        onChange={handleTeamNameChange}
      />
      <label>Year:</label>
      <input
        type="number"
        value={year}
        onChange={handleYearChange}
      />
      <button onClick={handleFetchDataClick}>Search!</button>
      <h2>{teamName}'s {year} Schedule</h2>
      <ul>
        {gameData &&
          gameData.map((game) => (
            <li key={game.id}>
              <div>
                <div>
                  <strong>{game.homeTeam}: {game.homePoints} </strong>
                </div>
              </div>
              <div>
                <div>
                  <strong>{game.awayTeam}: {game.awayPoints}</strong>
                </div>
              </div>
              <div>
                <strong>{formatDate(game.startDate)}</strong>
              </div>
              <h3>----------------</h3>
            </li>
          ))}
      </ul>
      <h2>{teamName}'s Stat Leaders</h2>
      <ul>
        {filteredStatsData.map((stats) => (
          <li key={stats.playerId}>
            <div>
              <strong>{stats.player}</strong>
            </div>
            <div>
              <strong>{stats.stat} {stats.category} {stats.statType}</strong>
            </div>
            <div>
              <strong> </strong>
            </div>
            <h3>----------------</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Team;
