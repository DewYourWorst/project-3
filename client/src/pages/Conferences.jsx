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
        default: 
          conAbbr = ConName;
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

  const tabOptions = ['B1G', 'SEC', 'ACC', 'B12', 'PAC', 'CUSA', 'MAC', 'MWC', 'Ind'];

  const conferenceListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
    gap: '20px', 
  };

  const conferenceItemStyle = {
    border: '10px solid', 
    borderColor: 'transparent', 
    textAlign: 'center',
    backgroundColor: '#E5E4E2',
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: '10px',
  };

  const imageStyle = {
    width: '50px',
    height: '50px',
  };

  return (
    <div className="w-2/3 mx-auto p-8 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className=" text-3xl font-semibold mb-6 text-center">Conferences</h2>

      <div>
        {tabOptions.map((tab) => (
          <button
            key={tab}
            onClick={() => fetchData(tab)} 
            className={conferenceName === tab ? 'active' : 'class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mb-3 rounded-full transition duration-300 ease-in-out transform hover:scale-95 focus:outline-none focus:ring focus:ring-blue-300 ml-4"'} 
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={conferenceListStyle} class="grid grid-flow-row-dense grid-cols-2 grid-rows-2 gap-4 box-border h-100 w-100 p-4 border-4">
        {data &&
          data.map((conference) => (
            <div
              key={conference.id}
              style={{
                ...conferenceItemStyle,
                borderColor: conference.color, 
              }}
            >
              <div>
                <img
                  src={conference.logos[0]}
                  alt={conference.school}
                  style={imageStyle} 
                />
              </div>
              <div>
                <span style={{ color: conference.color }}>
                  <Link to={`/team/${conference.school}`}>{conference.school}</Link>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Conferences;
