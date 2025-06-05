import Link from "next/link";

const PlayerCard = ({ data }) => {
    return (
        <div className="w-full sm:w-72 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-2 transition-all duration-300 hover:shadow-lg mx-auto">
            
            {/* Player Image or Placeholder */}
            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                {data.image ? (
                    <img
                        src={data.image}
                        alt={data.name}
                        className="rounded-full w-full h-full object-cover"
                    />
                ) : (
                    <svg className="w-14 h-14 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                )}
            </div>

            {/* Player Name */}
            <h3 className="text-lg font-semibold text-center text-gray-900">{data.name}</h3>

            {/* Position */}
            <p className="text-sm text-gray-600">Position: {data.position || "N/A"}</p>

            {/* Button */}
            <Link href={`/playersDetails/${data._id}`} className="mt-6">
                <button className="bg-red-600 text-white font-semibold text-sm px-5 py-2 rounded-md hover:bg-red-700 transition-all">
                    View Details
                </button>
            </Link>
        </div>
    );
};

export default PlayerCard;
