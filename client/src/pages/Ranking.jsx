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
    <div className="w-1/2 mx-auto p-8 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-4 text-center">National Rankings</h2>

      <div className="mb-4">
        <label className="text-gray-400">Year:</label>
        <input
          type="number"
          id="year"
          value={searchYear}
          onChange={handleYearChange}
          className="w-full py-2 px-3 bg-gray-700 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-400">Week:</label>
        <input
          type="number"
          id="week"
          value={searchWeek}
          onChange={handleWeekChange}
          className="w-full py-2 px-3 bg-gray-700 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <button
        onClick={handleFetchClick}
        className="bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300 w-full"
      >
        Search!
      </button>

      {data &&
      data[0].polls
      .filter((poll) => poll.poll === 'AP Top 25' || poll.poll === 'Coaches Poll')
      .map((poll) => (
      <div key={poll.poll} className="mt-8">
        <h3 className="text-2xl font-semibold">{poll.poll}</h3>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {poll.ranks.map((rank, index) => (
            <div key={rank.school} className="mb-2">
              <div>
                <p>
                  <Link to={`/team/${rank.school}`} className="text-blue-500 hover:underline">
                    {index + 1}. {rank.school}
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
    </div>
  );
}

export default Ranking;
