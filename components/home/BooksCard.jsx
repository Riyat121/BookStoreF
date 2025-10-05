import React from 'react'
import BooksSingleCard from './BooksSingleCard'

function BooksCard({ books }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {Array.isArray(books) && books.map((item) => (
        <BooksSingleCard key={item._id} book={item}/>
      ))}
    </div>
  )
}

export default BooksCard
