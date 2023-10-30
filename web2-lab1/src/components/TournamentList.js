import React from 'react';
import { Link } from 'react-router-dom';

function TournamentList({ tournamentIds }) {
  return (
    <div>
      <h2>Tournament List</h2>
      <ul>
        {tournamentIds.map(tournamentId => (
          <li key={tournamentId}>
            <Link to={`/${tournamentId}/`}>Tournament {tournamentId}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TournamentList;