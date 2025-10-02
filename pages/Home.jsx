import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import { MdOutlineAddBox } from 'react-icons/md';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://book-store-b.vercel.app/books') // 👈 ensure your backend route is correct
      .then((res) => {
        console.log("Books API response:", res.data);
        // If backend sends { data: [...] } use res.data.data
        // If backend sends just [...], use res.data
        setBooks(res.data.data || res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-700 px-4 py-1 rounded-lg"
          onClick={() => setShowType('table')}
        >
          Table
        </button>

        <button
          className="bg-sky-300 hover:bg-sky-700 px-4 py-1 rounded-lg"
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
}

export default Home;
