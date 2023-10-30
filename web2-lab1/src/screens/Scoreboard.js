import React, { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import db from "../config/firebase";
import { useParams } from "react-router-dom";
import AccountButton from "../components/accountButton";
import { Link } from "react-router-dom";


const Scoreboard = () => {
    const [competitors, setCompetitors] = useState([]);
    const { competitionId } = useParams();

    const getCompetitors = async () => {
        const reference = ref(db, `competition/${competitionId}/competitors`);
        const snapshot = await get(reference);

        if (!snapshot.exists()) {
            console.error("Snapshot does not exist!");
            return;
        }

        const data = Object.values(snapshot.val());
        setCompetitors(data);
    };

    const sortedCompetitors = competitors.slice().sort((a, b) => b.points - a.points);

    useEffect(() => {
        getCompetitors();
    }, []);

    return (
        <div>
            <div className="scoreboard-container">
                <h2>Scoreboard</h2>
                <table className="scoreboard-table">
                    <thead>
                        <tr>
                            <th>Competitor Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCompetitors.map((competitor, i) => (
                            <tr key={i++}>
                                <td>{competitor.name}</td>
                                <td>{competitor.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AccountButton />
            <Link to={`/competitions/${competitionId}`} className="scoreboard-button">
                Back
            </Link>
        </div>

    );
};

export default Scoreboard;
