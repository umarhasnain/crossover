
import MainSection from '@/components/MainSection'
import { PlayerProvider } from '@/context/PlayerContext'
import React from 'react'

const page = () => {
  return (
    <PlayerProvider>
      <div>
        <MainSection />
      </div>
    </PlayerProvider>

  )
}

export default page
