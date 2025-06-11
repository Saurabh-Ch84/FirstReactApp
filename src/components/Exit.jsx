import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Exit = () => {
  const username=useSelector((state)=>state.play.name)
  const navigate=useNavigate();

  const handleGoBack=()=>{
    navigate('/')
  }

  const handleYes=()=>{
    navigate('/goodbye')
  }

  return (
    <div className="text-blackbackdrop-blur-sm  shadow-lg border border-black w-full max-w-screen-md mx-auto p-4 rounded-2xl flex flex-col place-content-center">
      <div className='flex place-content-center'>
      <p className='text-2xl text-black font-bold mb-4'> Are you sure?</p>
      </div>
      <div className='flex justify-evenly'>
        <button
        onClick={handleYes}
        className='px-4 py-2 text-white bg-red-600
            rounded'>
              Yes
      </button>
        <button
        onClick={handleGoBack}
        className='px-4 py-2  text-white  bg-green-500
            rounded '>
              No
        </button>
      </div>
    </div>
  )
}

export default Exit