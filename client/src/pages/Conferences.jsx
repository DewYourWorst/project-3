import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Conferences() {
  const [data, setData] = useState(null);
  const { conferenceName } = useParams(); 

  const fetchData = async (conferenceName) => {
    try {
      const response = await fetch(`/cfb-api/conferences/${conferenceName}`);
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
    fetchData(conferenceName);
  }, [conferenceName]);

  const tabOptions = [
    'B1G',
    'SEC',
    'ACC',
    'B12',
    'PAC',
    'CUSA',
    'MAC',
    'MWC',
    'Ind',
  ];

  return (
    <div>
      <h2>Conferences</h2>

      <div>
        {tabOptions.map(tab => (
          <button
            key={tab}
            onClick={() => fetchData(tab)} 
            className={conferenceName === tab ? 'active' : ''}
          >
            {tab}
          </button>
        ))}
      </div>

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
                  <Link to={`/placeholder/${conference.school}`}>{conference.school}</Link>
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Conferences;
