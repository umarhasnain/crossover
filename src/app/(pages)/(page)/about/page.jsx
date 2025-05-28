import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

const teamMembers = [
  {
    name: "Edward",
    role: "CEO / Evaluator",
    description:
      "Edward’s deep connections with high school coaches nationwide give Crossover Report unmatched access to exclusive, up-to-the-minute player insights. His keen eye for talent and ability to spot rising stars early provide college programs with a powerful edge in recruitment. A highly respected figure in the basketball scouting world, Edward’s expertise helps shape the future of young athletes and the teams that recruit them.",
  },
  {
    name: "Darius Williams",
    role: "Evaluator",
    description:
      "Darius Williams is a key evaluator for Crossover Report, bringing sharp scouting expertise and a deep passion for identifying top basketball talent. With a strong eye for player potential, he provides in-depth analysis and exclusive insights that help college programs discover the next generation of stars. His dedication to the game and commitment to accurate, unbiased scouting make him an invaluable asset to the Crossover Report team.",
  },
];

const AboutSection = () => {
  return (
  <div>
    <Header/>
      <section className="py-12 px-4 md:px-12 lg:px-24 bg-white">
      <div className="space-y-12">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="relative bg-white shadow-md p-6 rounded-lg md:p-10 flex flex-col md:flex-row md:items-center md:justify-between overflow-hidden"
          >
            {/* Text Section */}
            <div className="z-10 max-w-3xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="font-semibold text-gray-700 mb-2">{member.role}</p>
              <p className="text-gray-600">{member.description}</p>
            </div>

            {/* Circle Background */}
            <div className="absolute right-0 bottom-0 w-48 h-48 md:w-64 md:h-64 bg-red-300/40 rounded-full translate-x-1/3 translate-y-1/3 -z-0" />
            <div className="absolute right-0 bottom-0 w-36 h-36 md:w-48 md:h-48 bg-red-300 rounded-tl-[120px] z-0" />
          </div>
        ))}
      </div>
    </section>
    <Footer/>
  </div>
  );
};

export default AboutSection;
