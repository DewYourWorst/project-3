import { useState } from "react"
import { useUserContext } from "../ctx/UserContext"
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  const { currUser, logout } = useUserContext()
  return (
    <header className="pb-0 mb-0" style={{ borderBottom: "1px solid #333" }}>
      <Navbar bg="dark" variant="dark" expand="md" style={{ justifyContent: "space-between" }}>
        <div className="container-fluid" style={{ width: "65%"}}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            {/* Add the activeKey code below and the rest shoud work  */}
            <Nav className="me-auto" activeKey={window.location.pathname}>
              <li><Nav.Link href="/">Home</Nav.Link></li>
              <li><Nav.Link href="/rankings">Rankings</Nav.Link></li>
              <li><Nav.Link href="/conferences">Conferences</Nav.Link></li>
              <li><Nav.Link href="/team">Team Search</Nav.Link></li>

              { currUser.status === "found" && (
                <>
                  <li><Nav.Link href="/Dashboard">Dashboard</Nav.Link></li>
                </>
              )}
              { currUser.status === "notfound" && (
                <>
                  <li><Nav.Link href="/signup">Sign Up</Nav.Link></li>
                  <li><Nav.Link href="/login">Log in</Nav.Link></li>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
        <div style={{ width: "35%", paddingRight: "10px" }}>
          { currUser.status === "found" && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ display: "flex", justifyContent: "flex-end"}}>
              <li className="nav-item">
                  <span className="nav-link active">Welcome back, {currUser.data.fname}</span>
              </li>
              <li className="nav-item">
                <button className="nav-link active" onClick={logout}>Logout</button>
              </li>
            </ul>
          )}
        </div>
      </Navbar>
    </header>
  )
}


export default Header