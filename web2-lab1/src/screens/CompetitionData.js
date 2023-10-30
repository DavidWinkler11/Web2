import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { set, get, ref } from "firebase/database";
import db from "../config/firebase";
import AccountButton from '../components/accountButton';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const CompetitionData = () => {
    const { competitionId } = useParams();
    const [competition, setCompetition] = useState({});
    const { user } = useAuth0();
    const [matches, setMatches] = useState([]);
    const [matchId, setMatchId] = useState(null);
    const [disabledButtons, setDisabledButtons] = useState(Array(matches.length).fill(false));

    let winner;
    let loser;
    let draw = false;


    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0)



    useEffect(() => {
        const reference = ref(db, `competition/${competitionId}`);
        get(reference)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const competitionData = snapshot.val();
                    setCompetition(competitionData);
                    setMatches(competitionData.matches);

                } else {
                    console.error("Competition not found");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [competitionId]);


    const handleScoreChange = (event, id) => {
        const value = event.target.value;
        const inputName = event.target.name;

        if (inputName === "homeScore") {
            setHomeScore(value);
        } else if (inputName === "awayScore") {
            setAwayScore(value);
        }
        setMatchId(id);

    };
    console.log("Win", competition.winPoints)

    const handleSubmitMatch = (matchId) => {
        setDisabledButtons((prevButtons) => {
            const updatedButtons = [...prevButtons];
            updatedButtons[matchId] = true;
            return updatedButtons;
        });

        if (!homeScore) {
            setHomeScore(0);
        }
        if (!awayScore) {
            setAwayScore(0);
        }
        if (homeScore === awayScore) {
            draw = true;
        }
        if (homeScore >= awayScore) {
            winner = competition.matches[matchId].home;
            loser = competition.matches[matchId].away;
        } else if (awayScore > homeScore) {
            loser = competition.matches[matchId].home;
            winner = competition.matches[matchId].away;
        }
        console.log("Winner", winner)

        const winCompetitor = competition &&
            competition.competitors ? competition.competitors.find((competitor) => competitor.name === winner) : null;
        const loseCompetitor = competition &&
            competition.competitors ? competition.competitors.find((competitor) => competitor.name === loser) : null;

        const updateCompetitorScores = (winnerName, loserName, winPoints, lossPoints, drawPoints) => {
            const competitionRef = ref(db, `competition/${competitionId}`);

            get(competitionRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const competitionData = snapshot.val();
                        const competitors = competitionData.competitors;

                        const winnerIndex = competition &&
                            competition.competitors ? competition.competitors.findIndex((competitor) => competitor.name === winner) : null;
                        const loserIndex = competition &&
                            competition.competitors ? competition.competitors.findIndex((competitor) => competitor.name === loser) : null;

                        console.log("winnerName", winnerName)
                        if (winnerIndex !== -1 && loserIndex !== -1) {

                            if (!draw) {
                                competitors[winnerIndex].points += winPoints;
                                competitors[loserIndex].points += lossPoints;
                            } else {
                                competitors[winnerIndex].points += drawPoints;
                                competitors[loserIndex].points += drawPoints;
                            }

                            competitionData.competitors = competitors;

                            set(competitionRef, competitionData)
                                .then(() => {
                                    console.log("Competitor scores updated successfully");
                                })
                                .catch((error) => {
                                    console.error("Error updating competitor scores:", error);
                                });
                        } else {
                            console.error("Winner or loser not found in competitors.");
                        }
                    } else {
                        console.error("Competition not found");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching competition data:", error);
                });
        };

        updateCompetitorScores(winCompetitor, loseCompetitor, Number(competition.winPoints), Number(competition.lossPoints), Number(competition.drawPoints));

    }

    return (
        <div>
            <h2>{competition.competitionName}</h2>
            {user?.email === competition.createdBy && (
                <div className="centered-container">
                    <div className="competition-list-container">
                        <h3>Matches</h3>
                        <ul className="competitions-list">
                            {matches && matches.map((match, index) => {
                                const matchId = index;
                                return (
                                    <li key={matchId}>
                                        <div className="match-container">
                                            <h3>{match.home} vs {match.away}</h3>
                                            <div className="score-inputs">
                                                <input
                                                    defaultValue={0}
                                                    type="number"
                                                    placeholder="Home"
                                                    name="homeScore"
                                                    onChange={(event) => handleScoreChange(event, matchId)}
                                                />
                                                <input
                                                    defaultValue={0}
                                                    type="number"
                                                    placeholder="Away"
                                                    name="awayScore"
                                                    onChange={(event) => handleScoreChange(event, matchId)}
                                                />
                                                <button
                                                    onClick={() => handleSubmitMatch(matchId)}
                                                    disabled={disabledButtons[matchId]} // Set the disabled state based on the array
                                                >Submit</button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <AccountButton />
                    </div>
                </div>
            )}
            {user?.email !== competition.createdBy && (
                <div className="centered-container">
                    <div className="competition-list-container">
                        <h3>Matches</h3>
                        <ul className="competitions-list">
                            {matches && matches.map((match, index) => (
                                <li key={index}>
                                    <h3>{match.home} vs {match.away}</h3>

                                </li>
                            ))}
                        </ul>
                        <AccountButton />
                    </div>
                </div>
            )}
            {user?.email !== competition.createdBy && (
                <div className="centered-container">
                    <div className="competition-list-container">
                        <h3>Matches</h3>
                        <ul className="competitions-list">
                            {matches && matches.map((match, index) => (
                                <li key={index}>
                                    <div className="match-input-container">
                                        <input width="0.8" type="text" value={match.home} readOnly />
                                        <span>vs</span>
                                        <input type="text" value={match.away} readOnly />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <AccountButton />
                    </div>
                </div>
            )}
            <AccountButton />
            <Link to={`/competitions/${competition.competitionId}/scoreboard`} className="scoreboard-button">
                Scoreboard
            </Link>
        </div>
    );
};

export default CompetitionData;
