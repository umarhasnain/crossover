'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { usePlayers } from "@/context/PlayerContext";
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const PlayerDetails = () => {
  const params = useParams();
  const { id } = params;
  const { players, loading } = usePlayers();

  if (loading) return <div className="text-center py-10">Loading...</div>;

  const player = players.find(p => p._id === id);

  if (!player) return <div className="text-center py-10 text-red-600">Player not found</div>;

  return (
 <div>
  <Header/>
     <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      {/* Player Name */}
      <h1 className="text-3xl font-bold text-center mb-6">{player.name}</h1>

      {/* Details Container */}
      <div className="flex flex-col  md:flex-row gap-6 max-w-6xl w-full">

        {/* Left Column */}
        <div className="bg-white shadow border rounded p-4 md:w-1/4 w-full">
          <h2 className="text-lg font-semibold ">Club Team</h2>
          <h4 className="text-lg  mb-2">{player.organisation}</h4>
          <div className="border-t pt-2 space-y-2">
            <div className="flex justify-between">
              <span>High School</span>
              <span className="font-semibold text-gray-700">{player.highSchool || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <svg className="w-4 h-4 text-red-700 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-.293.707L4.414 8.414A2 2 0 004 10v3a2 2 0 002 2h8a2 2 0 002-2v-3a2 2 0 00-.414-1.172l-1.293-1.293A1 1 0 0114 5V3a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-.293.707l-5.414 5.414a1 1 0 01-1.414 0L3.707 7.707A1 1 0 013 7V3z" />
                </svg>
                <span>{player.club || 'N/A'}</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span>Guidance counselor</span>
              <span>{player.counselor || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="bg-white shadow border rounded p-6 text-center md:w-2/4 w-full">
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
              {player.image ? (
                <img src={player.image} alt={player.name} className="rounded-full w-full h-full object-cover" />
              ) : (
                <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              )}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-red-600 mb-2">Evaluation:</h3>
          <p className="text-sm text-gray-700">{player.evaluation || 'N/A'}</p>
        </div>

        {/* Right Column */}
        <div className="bg-white shadow border rounded p-4 text-center md:w-1/4 w-full">
          <h2 className="text-lg font-semibold mb-2">{player.state || 'TN'}</h2>
          <iframe
            title="map"
            className="w-full h-48 rounded border"
            src={player.mapUrl || "https://www.google.com/maps/embed?..."}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
    <Footer/>
 </div>
  );
};

export default PlayerDetails;
