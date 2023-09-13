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
      <h1 className="text-8xl text-blue-400 font-semibold mb-6 mt-4 text-center">Dashboard</h1>
      <h2 className="text-5xl text-blue-400 font-semibold mb-4 text-center">Welcome Back, {fName}</h2>
      <div className="flex">
        <div className="w-1/2">
          <h2 className="text-3xl text-blue-400 font-semibold mb-2 text-center">Your Favorited Teams</h2>
          <ul>
            {userTeams.map((team, index) => (
              <li className="bullet text-3xl text-white font-semibold mb-6 underline text-center" key={index}>
                <Link to={`/team/${team}`}>{team}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2">
          <h2 className="text-3xl text-blue-400 font-semibold mb-2 text-center">Your Favorited Conferences</h2>
          <ul>
            {userConferences.map((conference, index) => ( 
              <li className="bullet text-3xl text-white font-semibold mb-6 underline text-center" key={index}>
                <Link to={`/conferences/${conference}`}>{conference}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
