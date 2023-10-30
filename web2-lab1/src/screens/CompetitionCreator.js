import React, { useState } from "react";
import "../App.css";
import db from "../config/firebase";
import { ref, set } from "firebase/database";
import AccountButton from "../components/accountButton";
import { useAuth0 } from "@auth0/auth0-react";

const CompetitionCreator = () => {
  const [competitionName, setCompetitionName] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [winPoints, setWinPoints] = useState(1);
  const [drawPoints, setDrawPoints] = useState(0.5);
  const [lossPoints, setLossPoints] = useState(0);
  const { user } = useAuth0();

  const [competitorData, setCompetitorData] = useState([]);

  function generateMatches(competitors) {
    if (competitors.length < 4) {
      return [];
    }

    const matches = [];

    const isOddNumberOfTeams = competitors.length % 2 !== 0;
    if (isOddNumberOfTeams) {
      competitors.push({ name: "Freebie" });
    }

    for (let round = 0; round < competitors.length - 1; round++) {
      for (let i = 0; i < competitors.length / 2; i++) {
        const homeTeam = competitors[i].name;
        const awayTeam = competitors[competitors.length - 1 - i].name;

        if (homeTeam !== "Freebie" && awayTeam !== "Freebie") {
          const match = {
            home: homeTeam,
            away: awayTeam,
            homeScore: null,
            awayScore: null
          };
          matches.push(match);
        }
      }

      competitors.splice(1, 0, competitors.pop());
    }

    return matches;
  }


  const handleCreateCompetition = (e) => {
    e.preventDefault();

    if (competitorData.length < 4) {
      alert("Minimum of 4 competitors is required.");
      return;
    }

    const competitionId = Math.floor(Math.random() * 2000000000) + 1;
    const reference = ref(db, `competition/${competitionId}`);
    const data = {
      competitionId: competitionId,
      competitionName: competitionName,
      competitors: competitorData,
      winPoints: winPoints,
      drawPoints: drawPoints,
      lossPoints: lossPoints,
      matches: generateMatches(competitorData),
      createdBy: user.email,
    };

    set(reference, data);
    alert("Competition saved!");

    setCompetitionName("");
    setCompetitors("");
    setWinPoints(1);
    setDrawPoints(0.5);
    setLossPoints(0);
    setCompetitorData([]);
  };

  const addCompetitor = () => {
    if (competitors && competitorData.length < 8) {
      setCompetitorData([...competitorData, { name: competitors, points: 0 }]);
      setCompetitors("");
    }
  };

  const handleDeleteCompetitor = (index) => {
    const updatedCompetitors = [...competitorData];
    updatedCompetitors.splice(index, 1);
    setCompetitorData(updatedCompetitors);
  };

  return (
    <div className="container">
      <main className="main">
        <h1 className="heading">Create a Competition!</h1>
        <form onSubmit={handleCreateCompetition}>
          <div className="form-group">
            <label htmlFor="competitionName">Competition Name:</label>
            <input
              type="text"
              id="competitionName"
              value={competitionName}
              onChange={(e) => setCompetitionName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="competitors">Competitors:</label>
            <input
              type="text"
              id="competitors"
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
            />
            <button
              type="button"
              onClick={addCompetitor}
              disabled={competitorData.length >= 8}
              className="button"
            >
              Add Competitor
            </button>
          </div>
          <div className="form-group row">
            <div className="input-group">
              <label htmlFor="winPoints">Win Points:</label>
              <input
                type="number"
                id="winPoints"
                value={winPoints}
                onChange={(e) => setWinPoints(parseFloat(e.target.value))}
                step="0.5"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="drawPoints">Draw Points:</label>
              <input
                type="number"
                id="drawPoints"
                value={drawPoints}
                onChange={(e) => setDrawPoints(parseFloat(e.target.value))}
                step="0.5"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="lossPoints">Loss Points:</label>
              <input
                type="number"
                id="lossPoints"
                value={lossPoints}
                onChange={(e) => setLossPoints(parseFloat(e.target.value))}
                step="0.5"
                required
              />
            </div>
          </div>
          <button type="submit" className="button">
            Create Competition
          </button>
        </form>
      </main>
      <section className="competitor-section">
        <h2>Added Competitors:</h2>
        <div className="competitor-list">
          {competitorData.map((competitor, index) => (
            <div key={index} className="competitor-box">
              <p>{competitor.name}</p>
              <button
                className="delete-competitor-button"
                onClick={() => handleDeleteCompetitor(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </section>
      <AccountButton />
    </div>
  );
};

export default CompetitionCreator;
