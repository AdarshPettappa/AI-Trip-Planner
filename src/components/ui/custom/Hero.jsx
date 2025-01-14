import React from 'react'
import {Button} from '../button'
import {Link} from 'react-router-dom'

function Hero() {
  return (
    <div className= 'flex flex-col items-center mx-56 gap-9'>
        <h1
            className='font-bold text-[45px] text-center mt-16'>
            <span className='text-[#f56551]'>Discover Your Next Adventure with AI: </span> Personalized Trip Planning at Your Fingertips
        </h1>
        <p className='text-xl text-gray-500 text-center'> Your Personal trip planner and travel curator, creating custom trips tailored to your interests and budget.</p>
        <Link to='/create-trip'>
            <Button> Get Started </Button>
        </Link>
    </div>
  )
}

export default Hero