import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = ({ destination = '/' }) => {
  return (
    <Link 
      to={destination} 
      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-200 group"
    >
      <BsArrowLeft className="text-xl mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
      Back
    </Link>
  )
}

export default BackButton
