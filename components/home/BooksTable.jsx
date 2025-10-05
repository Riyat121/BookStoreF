import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { PiBookOpenTextLight } from 'react-icons/pi'

function BooksTable({ books }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Book Details
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-md:hidden">
              Author
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-md:hidden">
              Year
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.map((book, index) => (
            <tr 
              key={book._id} 
              className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mr-4 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors duration-200">
                    <PiBookOpenTextLight className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-200">
                      {book.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {book._id.slice(-8)}
                    </div>
                  </div>
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-md:hidden">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-green-600 text-xs font-bold">A</span>
                  </div>
                  <span className="font-medium">{book.author}</span>
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-md:hidden">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-100 to-pink-100 text-red-800">
                  {book.publishYear}
                </span>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <div className="flex justify-center space-x-2">
                  <Link 
                    to={`/books/details/${book._id}`}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-all duration-200 group"
                    title="View Details"
                  >
                    <BsInfoCircle className="text-xl group-hover:scale-110 transition-transform duration-200" />
                  </Link>
                  
                  <Link 
                    to={`/books/edit/${book._id}`}
                    className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 rounded-lg transition-all duration-200 group"
                    title="Edit Book"
                  >
                    <AiOutlineEdit className="text-xl group-hover:scale-110 transition-transform duration-200" />
                  </Link>
                  
                  <Link 
                    to={`/books/delete/${book._id}`}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200 group"
                    title="Delete Book"
                  >
                    <MdOutlineDelete className="text-xl group-hover:scale-110 transition-transform duration-200" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BooksTable
