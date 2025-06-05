import React from 'react';

const PlayerDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        
        {/* Left Column */}
        <div className="bg-white shadow border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Club Team</h2>
          <div className="border-t pt-2 space-y-2">
            <div className="flex justify-between">
              <span>High School</span>
              <span className="font-semibold text-gray-700">Houston</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <svg className="w-4 h-4 text-red-700 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-.293.707L4.414 8.414A2 2 0 004 10v3a2 2 0 002 2h8a2 2 0 002-2v-3a2 2 0 00-.414-1.172l-1.293-1.293A1 1 0 0114 5V3a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-.293.707l-5.414 5.414a1 1 0 01-1.414 0L3.707 7.707A1 1 0 013 7V3z" />
                </svg>
                <span>N/A</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span>Guidance counselor</span>
              <span>N/A</span>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="bg-white shadow border rounded p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Anna Lee Avery</h2>
          <div className="flex justify-center mb-4">
            <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-red-600 mb-2">Evaluation:</h3>
          <p className="text-sm text-gray-700">
            Long and athletic hybrid-3 manufactures, 1 on 1 creator, mismatch producer; rises on jumper in traffic, creates, spins and attacks, finds the stripe; runs the floor;
          </p>
        </div>

        {/* Right Column */}
        <div className="bg-white shadow border rounded p-4 text-center">
          <h2 className="text-lg font-semibold mb-2">TN</h2>
          <iframe
            title="map"
            className="w-full h-48 rounded border"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13234.86542494866!2d-85.0!3d35.0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDAwJzAwLjAiTiA4NcKwMDAnMDAuMCJX!5e0!3m2!1sen!2sus!4v1615165151651"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
