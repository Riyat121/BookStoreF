import React from 'react'
import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle, BiShow } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { useState } from 'react'
import BookModel from './BookModel'

function BooksSingleCard({ book }) {
  const [showModel, setShowModel] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      {/* Publish Year Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
          {book.publishYear}
        </span>
      </div>

      {/* Book Cover */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50"></div>
        <PiBookOpenTextLight className="text-6xl text-blue-400 group-hover:text-blue-500 transition-colors duration-300 relative z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
      </div>

      {/* Book Content */}
      <div className="p-6">
        {/* Book Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-900 transition-colors duration-200">
          {book.title}
        </h3>

        {/* Author */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mr-3">
            <BiUserCircle className="text-green-600 text-lg" />
          </div>
          <span className="text-gray-700 font-medium text-sm">{book.author}</span>
        </div>

        {/* Book ID */}
        <div className="text-xs text-gray-400 mb-4 font-mono">
          ID: {book._id.slice(-8)}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowModel(true)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 group/btn"
            title="Quick View"
          >
            <BiShow className="text-xl group-hover/btn:scale-110 transition-transform duration-200" />
          </button>

          <Link 
            to={`/books/details/${book._id}`}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 group/btn"
            title="View Details"
          >
            <BsInfoCircle className="text-xl group-hover/btn:scale-110 transition-transform duration-200" />
          </Link>

          <Link 
            to={`/books/edit/${book._id}`}
            className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-all duration-200 group/btn"
            title="Edit Book"
          >
            <AiOutlineEdit className="text-xl group-hover/btn:scale-110 transition-transform duration-200" />
          </Link>

          <Link 
            to={`/books/delete/${book._id}`}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200 group/btn"
            title="Delete Book"
          >
            <MdOutlineDelete className="text-xl group-hover/btn:scale-110 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-300 pointer-events-none"></div>

      {/* Modal */}
      {showModel && <BookModel book={book} onClose={() => setShowModel(false)} />}
    </div>
  );
}

export default BooksSingleCard
