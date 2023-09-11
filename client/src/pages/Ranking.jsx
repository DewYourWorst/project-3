import React, { useState, useEffect } from 'react';

function Ranking() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/cfb-api/rankings');
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
  }, []);

  return (
    <div>
      <h2>National Rankings</h2>
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
                        <a href={`placeholder`}>
                          {rank.school}
                        </a>
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
