import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Card = ({ data }) => {
    console.log("Pladataaa===> ", data);

    return (
        <div>
            <div className="max-w-xs w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
                <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold">{data.name}</h2>
                        <p className="text-sm">{data.position}</p>
                    </div>
                    <p className="text-sm font-semibold">State: <span className="font-bold">{data.state}</span></p>
                </div>

                <div className="flex gap-4 justify-center items-center px-6 py-8">
                    <Image
                        height={200}
                        width={300}
                        className="w-20 h-20 rounded-full border-4 border-red-500 mb-4"
                        src="/assets/images/picture.png"
                        alt="Avatar"
                    />
                    <div>
                        <p className="font-semibold text-gray-800">{data.highSchool}</p>
                        <p className="text-gray-600">{data.organisation}</p>
                    </div>
                </div>

                <div className="px-6 pb-4">
                    <Link href={`/playersDetails/${data._id}`}>
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
                            View Detail
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
