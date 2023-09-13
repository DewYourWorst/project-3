import React, { useState, useEffect } from "react";
import { useUserContext } from "../ctx/UserContext";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currUser } = useUserContext();
  const userId = currUser?.data?._id;
  const fName = currUser?.data?.fname;
  const [userTeams, setUserTeams] = useState([]);
  const [userConferences, setUserConferences] = useState([]); 

  useEffect(() => {
    if (userId) {
      fetch(`/api/user/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUserTeams(data?.payload?.teams || []);
          setUserConferences(data?.payload?.conferences || []); 
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  if (currUser.status === "searching") return <></>;

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome Back, {fName}</h2>
      <div>
        <h2>Your Favorite Teams</h2>
        <ul>
          {userTeams.map((team, index) => (
            <li key={index}>
              <Link to={`/team/${team}`}>{team}</Link>
            </li>
          ))}
        </ul>

        <h2>Your Favorite Conferences</h2>
        <ul>
          {userConferences.map((conference, index) => ( 
            <li key={index}>
              <Link to={`/conferences/${conference}`}>{conference}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
