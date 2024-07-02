import React from 'react'
import Carousel from '../../Components/Carousel'
import ActionCard from '../../Components/ActionCard'

const Home = () => {
  return (
    <div className='h-full flex flex-col justify-between'>
      <div className='h-1/5 flex flex-col justify-center items-center'>
        <h1>Welcome Message</h1>
      </div>
      <div className='h-2/5 flex flex-col justify-center items-center'>
        <ActionCard />
      </div>
      <div className='h-2/5 flex flex-col justify-center items-center border-3 border-red-950'>
        <Carousel />
      </div>
    </div>
  )
}

export default Home