import React from 'react'
import Carousel from '../../Components/Carousel'

const Home = () => {
  return (
    <div className='h-[100%]'>
      <div className='flex flex-col justify-center items-center'>
        <h1>Welcome Message</h1>
      </div>
      <div className='h-[50%] flex flex-col justify-center items-center'>
        Card Container
      </div>
      <div className='h-[30%] flex flex-col justify-center items-center'>
        <Carousel />
      </div>
    </div>
  )
}

export default Home