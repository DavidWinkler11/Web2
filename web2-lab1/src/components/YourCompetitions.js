import React, { useEffect, useState } from "react";
import { get, ref, remove } from "firebase/database";
import db from "../config/firebase";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const YourCompetitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const { user } = useAuth0();

  const getCompetitions = async () => {
    const reference = ref(db, "competition");
    const snapshot = await get(reference);

    if (!snapshot.exists()) {
      console.error("Snapshot does not exist!");
      return;
    }

    const data = Object.values(snapshot.val());
    const competitionData = data
      .filter((competition) => competition.createdBy === user.email);

    setCompetitions(competitionData);
  };

  const handleDeleteCompetition = async (competitionId) => {
    const reference = ref(db, "competition/" + competitionId);
    await remove(reference);
    getCompetitions();
  };

  useEffect(() => {
    getCompetitions();
  }, []);

  return (
    <div className="competitions-list-container">
      <h2 className="competitions-list-title">Your Competitions:</h2>
      <ul className="competitions-list">
        {competitions.map((competition) => (
          <li key={competition.competitionId}>
            <Link to={`/competitions/${competition.competitionId}`}>
              {competition.competitionName}
            </Link>
            <button
              className="delete-competitor-button"
              onClick={() => handleDeleteCompetition(competition.competitionId)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourCompetitions;
