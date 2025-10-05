import React, { useEffect, useState } from 'react'
import { api } from '../src/api'
import { useParams, Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { PiBookOpenTextLight, PiUser, PiCalendar, PiClock, PiPencilSimple, PiTrash, PiInfo } from 'react-icons/pi'
import { MdEdit, MdDelete } from 'react-icons/md'

function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    api.get(`/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <BackButton />
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <PiBookOpenTextLight className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Book Details</h1>
                <p className="text-gray-600">View complete information about this book</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Cover & Basic Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Book Cover */}
                <div className="relative h-80 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50"></div>
                  <PiBookOpenTextLight className="text-8xl text-blue-400 relative z-10" />
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                </div>

                {/* Book Title & Author */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-3">
                    {book.title}
                  </h2>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mr-3">
                      <PiUser className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Author</p>
                      <p className="text-lg font-semibold text-gray-900">{book.author}</p>
                    </div>
                  </div>
                  
                  {/* Publication Year */}
                  <div className="flex items-center justify-center">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
                      <PiCalendar className="text-xl mr-2" />
                      {book.publishYear}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Information</h3>
                  <p className="text-gray-600">Complete details about this book in your collection</p>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Book ID */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <PiInfo className="text-blue-600 text-lg mr-2" />
                        Book ID
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <code className="text-sm text-gray-800 font-mono break-all">{book._id}</code>
                      </div>
                    </div>

                    {/* Publication Year */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <PiCalendar className="text-purple-600 text-lg mr-2" />
                        Publication Year
                      </div>
                      <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <span className="text-2xl font-bold text-purple-800">{book.publishYear}</span>
                      </div>
                    </div>

                    {/* Created Date */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <PiClock className="text-green-600 text-lg mr-2" />
                        Added to Collection
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                        <span className="text-sm text-green-800 font-medium">
                          {formatDate(book.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Last Updated */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <PiPencilSimple className="text-orange-600 text-lg mr-2" />
                        Last Updated
                      </div>
                      <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                        <span className="text-sm text-orange-800 font-medium">
                          {formatDate(book.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to={`/books/edit/${book._id}`}
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200"
                      >
                        <MdEdit className="text-xl mr-2" />
                        Edit Book
                      </Link>
                      
                      <Link
                        to={`/books/delete/${book._id}`}
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
                      >
                        <MdDelete className="text-xl mr-2" />
                        Delete Book
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowBook
