import React from 'react'
import MidHeader from './components/MidHeader'
import BotHeader from './components/BotHeader'
import TopHeader from './components/TopHeader'

export default function Header({ categories }) {
  return (
    <>
      <div >
        <TopHeader />
        <MidHeader />
      </div>
      <div className='sticky top-0 z-30'>
        <BotHeader />
      </div>
    </>
  )
}
