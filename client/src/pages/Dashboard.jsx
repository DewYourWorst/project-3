import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"
import Displaycard from "../components/GameResult";

const Dashboard = () => {
  const { currUser } = useUserContext()
  const [favoriteTeams, setFavoriteTeams] = useState([]); 

  useEffect(() => {
    fetch(`/api/user/favorite-teams/${currUser.data._id}`) 
      .then((response) => response.json())
      .then((data) => {
        setFavoriteTeams(data.favoriteTeams); 
      })
      .catch((error) => {
        console.error('Error fetching favorite teams:', error);
      });
  }, [currUser]);

  if (currUser.status === "searching") return <></>

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome Back, {currUser.data.fname}</h2>
      
      <h2>Your Favorited Teams</h2>
      <ul>
        {favoriteTeams.map((team) => (
          <li key={team._id}>{team.name}</li>
        ))}
      </ul>
    </>
  )
}

export default Dashboard
