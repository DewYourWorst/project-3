import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"
import GameResult from "../components/GameResult.jsx";

const HomePage = () => {
  const { currUser } = useUserContext()

  if( currUser.status === "searching" ) return <></>
  return (
    <>

    <div>

      { currUser.status === "notfound" ? (
        <p className="text-xs text-blue-400 font-semibold mb-6">You are not logged in.</p>
      ) : (
        <p className="text-xs text-blue-400 font-semibold mb-6">You are logged in.</p>
      )}
      <h1 className="text-8xl text-blue-400 font-semibold mb-6 text-center">Foot Book</h1>
      
    </div>
      < GameResult gameid = {401282790}/>
    </>
  )
}

export default HomePage