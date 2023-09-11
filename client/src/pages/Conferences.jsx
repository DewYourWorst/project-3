import React, { useState, useEffect } from 'react';

function Conferences() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/cfb-api/conferences');
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
      <h2>Conferences List</h2>
      <ul>
        {data &&
          data.map((conference) => (
            <li key={conference.id} style={{ backgroundColor: conference.color }}>
              <div>
                <img
                  src={conference.logos[0]} 
                  alt={conference.school}
                  width={50} 
                  height={50} 
                />
              </div>
              <div>
                <p>
                  <a href={`placeholder`} >
                    {conference.school}
                  </a>
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Conferences;
