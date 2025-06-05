'use client';

import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePlayers } from "@/context/PlayerContext";

export default function Dashboard() {
  const { players, loading } = usePlayers();

  if (loading) return <p className="text-center text-lg py-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <Header />

      {/* Main Section */}
      <main className="px-4 md:px-12 lg:px-24 py-6 flex-1">
        {/* Year Filter (Mock) */}
        <section className="mb-6">
          <ul className="flex justify-center flex-wrap gap-4 text-sm md:text-md font-semibold text-gray-700">
            <li className="cursor-pointer hover:text-blue-600">2024</li>
            <li className="cursor-pointer hover:text-blue-600">2025</li>
            <li className="cursor-pointer hover:text-blue-600">2026</li>
            <li className="cursor-pointer hover:text-blue-600">2027</li>
          </ul>
        </section>

        {/* Player Cards Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {players.map((playerData) => (
              <Card key={playerData._id} data={playerData} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
