import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Conferences() {
  const [data, setData] = useState(null);
  const { conferenceName } = useParams(); 
  const { ConName } = useParams();

  useEffect(() => {
    if(ConName !== undefined){
      let conAbbr
      switch (ConName) {
        case 'Big%20Ten':
          conAbbr = 'B1G';
          break;
        case 'Big%2012':
          conAbbr = 'B12';
          break;
        case 'Pac-12':
          conAbbr = 'PAC';
          break;
        case 'Conference%20USA':
          conAbbr = 'CUSA';
          break;
        case 'Mid-American':
          conAbbr = 'MAC';
          break;
        case 'Mountain%20West':
          conAbbr = 'MWC';
          break;
        case 'FBS%20Independents':
          conAbbr = 'Ind';
          break;
      }
      
      fetchData(conAbbr);
    }
  }, [ConName]);

  
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
