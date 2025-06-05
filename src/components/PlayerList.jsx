import React from 'react';
import { usePlayers } from '../context/PlayerContext';

const PlayerList = () => {
  const { players, loading } = usePlayers();

  if (loading) return <p>Loading players...</p>;

  return (
    <ul>
      {players.map(player => (
        <li key={player._id}>
          {player.name} - {player.position} ({player.age} years old)
        </li>
      ))}
    </ul>
  );
};

export default PlayerList;
