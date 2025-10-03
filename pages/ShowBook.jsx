import React,{useEffect,useState} from 'react'
import { api } from '../src/api'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
function ShowBook() {
const [book,setBook] = useState({});
const [loading,setLoading] = useState(false);
const {id} = useParams();

useEffect(()=>{
    setLoading(true);
    api.get(`/books/${id}`)
    .then((res)=>{
        setBook(res.data);
        setLoading(false);
    })
    .catch((error)=>{
        console.log(error);
          setLoading(false);
        
    })
},[])

  return (
    <div className='p-4'>
        <BackButton/>
<h1 className='text-3xl my-4'>show Book</h1>  
{loading ? (
    <Spinner/>
) : (
<div className='flex flex-col border-2 border-sky-200 rounded-xl w-fit p-4'>
<div className='my-4'>
    <span className='text-xl mr-4 text-gray-500'>Id
<span>{book._id}</span>
    </span>

</div>
<div className='my-4'>
    <span className='text-xl mr-4 text-gray-500'>title
<span>{book.title}</span>
    </span>

</div>
<div className='my-4'>
    <span className='text-xl mr-4 text-gray-500'>Author
<span>{book.author}</span>
    </span>

</div>
<div className='my-4'>
    <span className='text-xl mr-4 text-gray-500'>Publish year :
<span> {book.publishYear}</span>
    </span>

</div>
<div className='my-4'>
    <span className='text-xl mr-4 text-gray-500'>create time
<span>{new Date(book.createdAt).toString()}</span>
    </span>

</div>
<div className='my-4'>
    <span className='text-xl mr-4 text-gray-500'>Last update time 
<span>{new Date(book.updatedAt).toString()}</span>
    </span>

</div>
</div>
)}    
    </div>
  )
}

export default ShowBook
