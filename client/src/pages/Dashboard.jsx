import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"
import Displaycard from "../components/Displaycard";

const Dashboard = () => {
  const { currUser } = useUserContext()

  if( currUser.status === "searching" ) return <></>
  return (
    <>
      <h1>Dashboard</h1>

      
    </>
  )
}

export default Dashboard