import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"
import GameResult from "../components/GameResult.jsx";

const HomePage = () => {
  const { currUser } = useUserContext()

  if( currUser.status === "searching" ) return <></>
  return (
    <>

      <div className="w-2/3 mx-auto p-8 bg-gray-800 rounded-lg shadow-lg text-white">

        { currUser.status === "notfound" ? (
          <p className="text-xs text-blue-400 font-semibold mb-6">You are not logged in.</p>
        ) : (
          <p className="text-xs text-blue-400 font-semibold mb-6">You are logged in.</p>
        )}
        <h1 className="text-8xl text-blue-400 font-semibold mb-6 text-center">Foot Book</h1>
   
    </div>

    </>
  )
}

export default HomePage