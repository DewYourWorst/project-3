import React, { useState, useEffect } from 'react';

function Team() {
  const [gameData, setGameData] = useState(null);
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch('/cfb-api/games');
        if (!response.ok) {
          throw new Error(`Server status ${response.status}`);
        }
        const responseData = await response.json();
        setGameData(responseData);
      } catch (error) {
        console.error('Error fetching game data', error.message);
      }
    };

    const fetchStatsData = async () => {
      try {
        const response = await fetch('/cfb-api/stats');
        if (!response.ok) {
          throw new Error(`Server status ${response.status}`);
        }
        const responseData = await response.json();
        setStatsData(responseData);
      } catch (error) {
        console.error('Error fetching stats data', error.message);
      }
    };

    fetchGameData();
    fetchStatsData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const title = gameData
    ? `${gameData[0].season} ${gameData[0].seasonType} season games`
    : 'Games';

  const filteredStatsData = statsData ? statsData.filter((stats) => stats.stat > 0) : [];

  return (
    <div>
      <h1>{title}</h1>
      <h2>Schedule</h2>
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
      <h2>Stats Data</h2>
      <ul>
        {filteredStatsData.map((stats) => (
          <li key={stats.playerId}>
            <div>
              <strong>Player: {stats.player}</strong>
            </div>
            <div>
              <strong>Category: {stats.category}</strong>
            </div>
            <div>
              <strong>Stat Type: {stats.statType}</strong>
            </div>
            <div>
              <strong>Stat: {stats.stat}</strong>
            </div>
            <h3>----------------</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Team;
