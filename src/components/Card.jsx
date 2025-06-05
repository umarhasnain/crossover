import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Card = ({ data }) => {
    console.log("Pladataaa===> ", data);

    return (
        <div>
            <div class="max-w-sm w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
                <div class="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
                    <div>
                        <h2 class="text-lg font-bold">{data.name}</h2>
                        <p class="text-sm">{data.position}</p>
                    </div>
                    <p class="text-sm font-semibold">State: <span class="font-bold">{data.state}</span></p>
                </div>

                <div class="flex gap-4 justify-center items-center px-6 py-8">
                    <Image height={200} width={300} class="w-20 h-20 rounded-full border-4 border-red-500 mb-4" src="/assets/images/picture.png" alt="Avatar" />
                    <div>
                        <p class="font-semibold text-gray-800">{data.highSchool}</p>
                        <p class="text-gray-600">{data.organisation}</p>
                    </div>
                </div>

                <div class="px-6 pb-4">
                    <Link href={`/playersDetails/${data._id}`}>
                        <button class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
                            View Detail
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Card
