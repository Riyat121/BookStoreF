import React from 'react'
import { PiBookOpenTextLight } from 'react-icons/pi'

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        {/* Inner book icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PiBookOpenTextLight className="text-blue-600 text-2xl animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading books...</p>
    </div>
  )
}

export default Spinner
