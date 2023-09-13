import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Conferences() {
  const [data, setData] = useState(null);
  const { conferenceName } = useParams(); 
  const { ConName } = useParams();

  useEffect(() => {
    if(ConName !== undefined){
      fetchData(ConName);
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
    <div className="w-2/3 mx-auto p-8 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className=" text-3xl font-semibold mb-6 text-center">Conferences</h2>

      <div>
        {tabOptions.map(tab => (
          <button
            key={tab}
            onClick={() => fetchData(tab)} 
            className={conferenceName === tab ? 'active' : 'class="bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300 ml-4"'} 
          >
            {tab}
          </button>
        ))}
      </div>

      <ul class="grid grid-flow-row-dense grid-cols-2 grid-rows-2 gap-4 box-border h-100 w-100 p-4 border-4">
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
