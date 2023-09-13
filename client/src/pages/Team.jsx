import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Team() {
  const [gameData, setGameData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [teamName, setTeamName] = useState('Alabama');
  const [year, setYear] = useState(2023);
  const { schoolName } = useParams();

  useEffect(() => {
  })

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
    setTeamName(inputValue);
  };

  const handleYearChange = (e) => {
    const inputValue = e.target.value;
    setYear(inputValue);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const title = gameData
    ? `${teamName}'s ${gameData[0].season} ${gameData[0].seasonType} season games`
    : 'Search for a team';

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
    <div className="w-1/2 mx-auto p-8 bg-gray-800 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-semibold mb-4 text-center">{title}</h1>
      <div className="flex justify-center mb-4">
        <label className="text-gray-400">Team Name:</label>
        <input
          type="text"
          value={teamName}
          onChange={handleTeamNameChange}
          className="w-40 py-2 px-3 bg-gray-700 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:border-blue-500 ml-2"
        />
        <label className="text-gray-400 ml-4">Year:</label>
        <input
          type="number"
          value={year}
          onChange={handleYearChange}
          className="w-20 py-2 px-3 bg-gray-700 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:border-blue-500 ml-2"
        />
        <button
          onClick={handleFetchDataClick}
          className="bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300 ml-4"
        >
          Search!
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-2">{scheduleText}</h2>
      <ul>
        {gameData &&
          gameData.map((game) => (
            <li key={game.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <strong style={winOrLose(game.awayPoints, game.homePoints).away}>
                    {game.awayTeam}: {game.awayPoints}
                  </strong>
                  {' at '}
                  <strong style={winOrLose(game.awayPoints, game.homePoints).home}>
                    {game.homeTeam}: {game.homePoints}
                  </strong>
                </div>
              </div>
              <hr className="my-2" />
            </li>
          ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2 mt-4">{statText}</h2>
      <div className="grid grid-cols-3 gap-4">
        {filteredStatsData.map((stats) => (
          <div key={stats.playerId} className="mb-4">
            <div>
              <strong>{stats.player}</strong>
            </div>
            <div>
              <strong>{stats.stat} {stats.category} {stats.statType}</strong>
            </div>
            <div>
              <strong> </strong>
            </div>
            <hr className="my-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
