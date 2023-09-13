import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Team() {
  const [gameData, setGameData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [teamName, setTeamName] = useState('Alabama');
  const [year, setYear] = useState(2023);
  const { schoolName } = useParams();

  useEffect(() => {
    console.log("schoolName:", schoolName);
    console.log("teamName:", teamName);
    console.log("year:", year);
    if (schoolName !== undefined) {
      // Set the teamName based on the param
      setTeamName(schoolName);
      // Fetch data when schoolName changes
      fetchData(teamName, year);
    }
  }, [schoolName, year, teamName]); // Include year as a dependency here

  const fetchData = async (teamName, year) => {
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
    ? `${teamName}'s ${gameData[0].season} ${gameData[0].seasonType} season games` : 'Search for a team';

  const scheduleText = gameData ? `${teamName}'s ${year} Schedule` : '';
  const statText = gameData ? `${teamName}'s Stat Leaders` : '';

  const winOrLose = (awayPoints, homePoints) => {
    const styles = {
      away: {},
      home: {},
    };
    if (awayPoints > homePoints) {
      styles.away.color = 'green';
      styles.home.color = 'red';
    } else if (awayPoints < homePoints) {
      styles.away.color = 'red';
      styles.home.color = 'green';
    }

    return styles;
  };

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
      <h2>{scheduleText}</h2>
      <ul>
        {gameData &&
          gameData.map((game) => (
            <li key={game.id}>
              <div>
                <strong style={winOrLose(game.awayPoints, game.homePoints).away}>
                  {game.awayTeam}: {game.awayPoints}
                </strong>
                {' at '}
                <strong style={winOrLose(game.awayPoints, game.homePoints).home}>
                  {game.homeTeam}: {game.homePoints}
                </strong>
              </div>
              <div>
                <strong>{formatDate(game.startDate)}</strong>
              </div>
              <h3>----------------</h3>
            </li>
          ))}
      </ul>
      <h2>{statText}</h2>
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
