import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"

const Displaycard = () => {

  //fetch api data


  async function api() {
    const response = await fetch("http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard");
    const scoreboard = await response.json();
    console.log(scoreboard);
  }

  return (
    <>
      <h1>Displaycard</h1>
    </>
  )
}

export default Displaycard