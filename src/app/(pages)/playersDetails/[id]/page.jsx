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

  if (loading) return <div className="text-center py-20 text-xl font-medium">Loading...</div>;

  const player = players.find(p => p._id === id);
  if (!player) return <div className="text-center py-20 text-red-600 text-lg">Player not found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 capitalize">{player.name}</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/4 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Club Team</h2>
            <p className="text-gray-600">{player.organisation}</p>
            <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
              <p><strong>High School:</strong> {player.highSchool || 'N/A'}</p>
              <p><strong>Club:</strong> {player.club || 'N/A'}</p>
              <p><strong>Counselor:</strong> {player.counselor || 'N/A'}</p>
            </div>
          </div>

          {/* Middle Column */}
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-full md:w-2/4">
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
                {player.image ? (
                  <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-full h-full text-gray-400 p-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">Evaluation</h3>
            <p className="text-gray-700">{player.evaluation || 'N/A'}</p>
            {/* <p className="text-gray-700">
  {player.evaluationDate ? player.evaluationDate.split('T')[0] : 'N/A'}
</p> */}

            {player.evaluationDate ? new Date(player.evaluationDate).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}) : 'N/A'}

          </div>

          {/* Right Column */}
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/4 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">{player.state || 'TN'}</h2>
            <iframe
              title="map"
              className="w-full h-52 rounded"
              src={player.mapUrl || "https://www.google.com/maps/embed?..."}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>

      {/* Sticky Footer at Bottom */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default PlayerDetails;
