import React from 'react'

const Card = () => {
    return (
        <div>
            <div class="max-w-sm w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
                <div class="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
                    <div>
                        <h2 class="text-lg font-bold">Jasmine Nivar</h2>
                        <p class="text-sm">Guard</p>
                    </div>
                    <p class="text-sm font-semibold">State: <span class="font-bold">NC</span></p>
                </div>

                <div class="flex flex-col items-center px-6 py-4">
                    <img class="w-20 h-20 rounded-full border-4 border-red-500 mb-4" src="https://via.placeholder.com/100x100.png?text=Avatar" alt="Avatar"/>
                        <p class="font-semibold text-gray-800">Apex Friendship</p>
                        <p class="text-gray-600">Carolina Flames</p>
                </div>

                <div class="px-6 pb-4">
                    <button class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
                        View Detail
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Card
