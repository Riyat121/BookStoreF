import React, { useEffect, useState } from 'react';
import { api } from '../src/api';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import { MdOutlineAddBox, MdViewList, MdViewModule } from 'react-icons/md';
import { PiBooksFill } from 'react-icons/pi';
import AuthButton from '../components/AuthButton';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    api
      .get('/books')
      .then((res) => {
        console.log("Books API response:", res.data);
        setBooks(res.data.data || res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <PiBooksFill className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My BookStore</h1>
                <p className="text-gray-600">Manage your book collection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <AuthButton />
              <Link 
                to="/books/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
              >
                <MdOutlineAddBox className="text-xl mr-2" />
                Add New Book
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-1 border border-gray-200">
            <button
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                showType === 'table' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setShowType('table')}
            >
              <MdViewList className="text-xl mr-2" />
              Table View
            </button>
            <button
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                showType === 'card' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setShowType('card')}
            >
              <MdViewModule className="text-xl mr-2" />
              Card View
            </button>
          </div>
        </div>

        {/* Books Count */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {books.length} {books.length === 1 ? 'Book' : 'Books'}
                </h2>
                <p className="text-gray-600">In your collection</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                <PiBooksFill className="text-green-600 text-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Books Display */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner />
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-20">
              <PiBooksFill className="text-gray-300 text-8xl mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No books found</h3>
              <p className="text-gray-500 mb-6">Start building your collection by adding your first book!</p>
              <Link 
                to="/books/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
              >
                <MdOutlineAddBox className="text-xl mr-2" />
                Add Your First Book
              </Link>
            </div>
          ) : showType === 'table' ? (
            <BooksTable books={books} />
          ) : (
            <div className="p-6">
              <BooksCard books={books} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
