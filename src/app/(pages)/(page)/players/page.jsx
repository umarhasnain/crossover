'use client';
import PlayerCard from '@/components/PlayerCard'; // Use default import if exported as default
import React from 'react';
import { usePlayers } from "@/context/PlayerContext";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Players = () => {
  const { players, loading } = usePlayers();

  if (loading) return <p className="text-center text-lg py-10">Loading...</p>;

  return (
    <div>
          <Header/>
      <div className="px-4 py-8 max-w-7xl mx-auto">
  <h1 className='flex justify-center items-center text-3xl font-bold pb-8'>Players</h1>
      <section>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"> */}
          <div className="flex flex-wrap gap-6 justify-center">
            {players.map(player => (
              <PlayerCard key={player._id} data={player} />
            ))}
          </div>

        {/* </div> */}
      </section>
  
    </div>
        <Footer/>
    </div>
  );
};

export default Players;
