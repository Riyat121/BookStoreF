import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { api } from '../src/api'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { PiBookOpenTextLight, PiUser, PiCalendar } from 'react-icons/pi'
import { MdSave } from 'react-icons/md'

function CreateBooks() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async () => {
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    const yearNumber = publishYear === '' ? NaN : Number(publishYear);

    if (!trimmedTitle || !trimmedAuthor || Number.isNaN(yearNumber)) {
      enqueueSnackbar('Please provide title, author, and a valid publish year.', { variant: 'warning' });
      return;
    }

    const data = { title: trimmedTitle, author: trimmedAuthor, publishYear: yearNumber };

    try {
      setLoading(true);
      await api.post('/books', data);
      setLoading(false);
      enqueueSnackbar('Book created successfully', { variant: "success" });
      navigate('/');
    } catch (error) {
      setLoading(false);
      const serverMsg = error?.response?.data?.message || error?.message || 'Unknown error';
      enqueueSnackbar(`Create failed: ${serverMsg}`, { variant: "error" });
      console.error('Create book error:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <BackButton />
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <PiBookOpenTextLight className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
                <p className="text-gray-600">Fill in the details to add a new book to your collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Information</h2>
            <p className="text-gray-600">Please provide the following details for your new book</p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {loading && (
              <div className="flex justify-center items-center py-8">
                <Spinner />
              </div>
            )}

            <div className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <PiBookOpenTextLight className="text-blue-600 text-lg mr-2" />
                  Book Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the book title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Author Field */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <PiUser className="text-green-600 text-lg mr-2" />
                  Author Name *
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter the author's name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Publish Year Field */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <PiCalendar className="text-purple-600 text-lg mr-2" />
                  Publication Year *
                </label>
                <input
                  type="number"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  placeholder="Enter the publication year"
                  min="1000"
                  max="2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBook}
                disabled={loading}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <MdSave className="text-xl mr-2" />
                    Create Book
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBooks
