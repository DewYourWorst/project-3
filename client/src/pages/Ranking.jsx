import React, { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown'

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
      <button onClick={fetchData}>Fetch Rankings</button>
      <div>
        <h2>API response</h2>
        <pre>{JSON.stringify(data)}</pre>
        <Dropdown />
      </div>
    </div>
  );
}

export default Ranking;
