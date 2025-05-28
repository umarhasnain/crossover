'use client';
import Image from 'next/image';
import { BarChart2, Users } from 'lucide-react';
import Footer from './Footer';
import Link from 'next/link';

const MainSection = () => {
    return (
        <div className="min-h-screen bg-[#fafafa] font-sans text-gray-800">
            {/* Header */}
            <header className="bg-[#471300] flex items-center justify-between px-4 sm:px-8 lg:px-20 py-5">
                <div className="flex items-center">
                    <Image
                        src="/assets/images/logo.png"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="border border-white"
                    />
                </div>
                <div className="flex gap-6 text-white font-medium text-base">
                    <Link href='sign-in' className="border-2 p-2 px-4 rounded-xl  hover:bg-white hover:text-black"> Sign In</Link>
                    <Link href='sign-up' className="border-2 p-2 px-4 rounded-xl bg-white text-black  hover:bg-[#471300] hover:text-white"> Sign Up</Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 py-12 grid grid-cols-1 xl:grid-cols-7 gap-10 items-start">

                {/* Left Image */}
                <div className="flex justify-center xl:col-span-2">
                    <Image
                        src="/assets/images/player.png"
                        alt="Basketball Player Left"
                        width={600}
                        height={600}
                        className="max-w-full h-auto object-contain"
                    />
                </div>

                {/* Content Box */}
                <div className="xl:col-span-3 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-8 w-full">
                    <h1 className="text-center text-3xl font-extrabold text-[#471300] mb-4 tracking-tight">
                        Cross Over Report Services
                    </h1>

                    {/* Stats */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center text-gray-700 text-base font-medium mb-6">
                        <div className="flex items-center gap-2">
                            <BarChart2 size={20} />
                            <span>0 players added this week</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={20} />
                            <span>500 overall players</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] leading-[1.1rem] tracking-normal text-justify">
                        Crossover Report Scouting Services is a leading provider of comprehensive scouting and recruitment support for collegiate sports programs, specializing in identifying top-tier basketball talent from high school and junior high schools across the United States. With an extensive database featuring over 500 of the most promising athletes, Crossover Report provides invaluable insights and detailed player profiles to help college coaches build successful teams. The service is renowned for its accuracy and in-depth analysis, making it a trusted resource for college recruitment efforts.

                        <br /><br />
                        At the heart of Crossover Report Scouting Services is Edward, a seasoned talent evaluator with over two decades of experience in scouting and player development. Edward's career is marked by a proven track record of successfully identifying, recruiting, and developing athletes who go on to play at the highest levels of college basketball. He has played an instrumental role in transforming struggling Division I programs into conference contenders through his expertise in recruitment and talent evaluation.

                        <br /><br />
                        Edward’s strong relationships with high school coaches nationwide are a significant asset to Crossover Report. His wide network allows the service to access exclusive and up-to-date information about players, providing college programs with a unique advantage when recruiting young talent. His deep understanding of player potential, combined with his ability to spot emerging talent early, has made him a highly respected figure in the basketball scouting community.

                        <br /><br />
                        In addition to his work with Crossover Report, Edward is also the owner and director of Ball So Hard Events, an exclusive platform dedicated to showcasing the skills of 7th-11th grade basketball players. This event serves as a key opportunity for athletes to gain exposure and compete in front of over 100 college coaches. Ball So Hard Events helps young athletes improve their visibility and increase their chances of being recruited to collegiate programs.

                        <br /><br />
                        For those seeking the latest updates, insights, and expert analysis on basketball recruitment, Crossover Report Scouting Services is active on Twitter under the handle <strong>@Crossoverreport</strong>. With its commitment to excellence and a deep understanding of the recruiting landscape, Crossover Report is the go-to resource for college programs looking to build successful, competitive teams by identifying the best.
                    </p>
                </div>

                {/* Right Image */}
                <div className="flex justify-center xl:col-span-2">
                    <Image
                        src="/assets/images/player.png"
                        alt="Basketball Player Right"
                        width={600}
                        height={600}
                        className="max-w-full h-auto object-contain"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainSection;
