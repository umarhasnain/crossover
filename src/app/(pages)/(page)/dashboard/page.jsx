'use client';

import React, { useState } from 'react';
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePlayers } from "@/context/PlayerContext";

export default function Dashboard() {
  const { players, loading } = usePlayers();
  const [selectedYear, setSelectedYear] = useState("2024"); // Default year

  if (loading) return <p className="text-center text-lg py-10">Loading...</p>;

  // Filtered players based on selected year
  const filteredPlayers = players.filter(player => {
    if (!player.year) return false;
    return player.year.toString() === selectedYear;
  });

  const years = ["2024", "2025", "2026", "2027"];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <main className="px-4 md:px-12 lg:px-24 py-10 flex-1">
   {/* Year Filter Buttons */}
<section className="mb-6">
  <ul className="flex justify-center flex-wrap gap-4 text-base md:text-lg font-semibold text-gray-700">
    {years.map((year) => (
      <li
        key={year}
        className={`cursor-pointer px-6 py-2 rounded ${
          selectedYear === year ? 'bg-[#471300] text-white' : 'hover:text-[#e7000b]'
        }`}
        onClick={() => setSelectedYear(year)}
      >
        {year}
      </li>
    ))}
  </ul>
</section>


        {/* Player Cards */}
        <section>
          {filteredPlayers.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
              {filteredPlayers.map((playerData) => (
                <Card key={playerData._id} data={playerData} />
              ))}
            </div>
          ) : (
            <p className="text-center text-red-500 text-md mt-10">No players found for {selectedYear}</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
