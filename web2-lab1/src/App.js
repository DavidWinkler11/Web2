import React from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./screens/Login";
import CompetitionCreator from "./screens/CompetitionCreator";
import CompetitionData from "./screens/CompetitionData";
import CompetitionList from './screens/CompetitionList';
import Scoreboard from "./screens/Scoreboard";

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/competitionCreator/" element={<CompetitionCreator />} />
        <Route path="/competitions/:competitionId/" element={<CompetitionData />} />
        <Route path="/competitions/" element={<CompetitionList />} />
        <Route path="/competitions/:competitionId/scoreboard/" element={<Scoreboard />} />
      </Routes>
    </Router>

  )
};
export default App;