import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Wrapper, } from "./components"
import { UserProvider } from "./ctx/UserContext";
import { HomePage, LoginPage, SignupPage, Dashboard, Ranking, Conferences, Team } from "./pages";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'



function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Wrapper>
          <Header />
          <div className="pt-3 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/rankings" element={<Ranking />} />
              <Route path="/conferences" element= {<Conferences />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          </div>
        </Wrapper>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
