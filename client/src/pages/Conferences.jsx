import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUserContext } from "../ctx/UserContext";

function Conferences() {
  const [data, setData] = useState(null);
  const [teamName, setTeamName] = useState(null); 
  const { conferenceName } = useParams();
  const { ConName } = useParams();
  const { currUser } = useUserContext();
  const userId = currUser?.data?._id;
  const [showAddToConferencesButton, setShowAddToConferencesButton] = useState(false);


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

  const handleFavoriteChange = () => {
    addToFavorites(teamName); 
  }

  const addToFavorites = async (teamName) => {
    try {
      if (!userId) {
        console.error('User ID is not available.');
        return;
      }
      const userResponse = await fetch(`/api/user/${userId}`);
      if (!userResponse.ok) {
        throw new Error(`Server status ${userResponse.status}`);
      }
      const userData = await userResponse.json();
  
      if (!userData.payload.teams.includes(teamName)) {
        userData.payload.teams.push(teamName);
  
        const requestData = {
          teams: userData.payload.teams,
        };
        const response = await fetch(`/api/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          throw new Error(`Server status ${response.status}`);
        }
  
        console.log('User data updated successfully.');
      } else {
        console.log(`${teamName} is already in the user's favorites.`);
      }
    } catch (error) {
      console.error('Error updating user data:', error.message);
    }
  };

  const addToConferences = async () => {
    try {
      if (!userId) {
        console.error('User ID is not available.');
        return;
      }
      const userResponse = await fetch(`/api/user/${userId}`);
      if (!userResponse.ok) {
        throw new Error(`Server status ${userResponse.status}`);
      }
      const userData = await userResponse.json();
  
      console.log('Current user data:', userData); 
      console.log('Current conferenceName:', conferenceName); 
  
      if (!userData.payload.conferences.includes(conferenceName)) {
        userData.payload.conferences.push(conferenceName);
  
        const requestData = {
          conferences: userData.payload.conferences,
        };
        const response = await fetch(`/api/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        console.log('PUT request response:', response); 
  
        if (!response.ok) {
          throw new Error(`Server status ${response.status}`);
        }
  
        console.log('User data updated successfully.');
      } else {
        console.log(`${conferenceName} is already in the user's conferences.`);
      }
    } catch (error) {
      console.error('Error updating user data:', error.message);
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
              <button
                onClick={() => {
                  setTeamName(conference.school); 
                  handleFavoriteChange();
                }}
                className="bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300 ml-4"
              >
                Add team to favorites
              </button>
            </div>
          ))}
      </div>
    </div>
  );

}

export default Conferences;
