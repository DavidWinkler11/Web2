import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get, ref } from "firebase/database";
import db from "../config/firebase";
import AccountButton from '../components/accountButton';


const CompetitionList = () => {
  const [competitions, setCompetitions] = useState([]);

  const getCompetitions = async () => {
    const reference = ref(db, 'competition');
    const snapshot = await get(reference);

    if (!snapshot.exists()) {
      console.error("Snapshot does not exist!");
      return;
    }

    const data = Object.values(snapshot.val());
    setCompetitions(data);
  };

  useEffect(() => {
    getCompetitions();
  }, []);

  return (
    <div className="centered-container">
      <div className="competition-list-container">
        <h2>Competitions</h2>
        <ul className="competitions-list">
          {competitions.map((competition) => (
            <li key={competition.competitionId}>
              <Link to={`/competitions/${competition.competitionId}`} style={{ textDecoration: 'none' }}>
                <h3>{competition.competitionName}</h3>
              </Link>
            </li>
          ))}
        </ul>
        <AccountButton />
      </div>
    </div>
  );
};
export default CompetitionList;
