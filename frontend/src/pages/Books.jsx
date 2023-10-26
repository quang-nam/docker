import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData= async()=>{
        try {
            const res= await axios.get('http://localhost:8080/books')
            console.log(res)
            setBooks(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete= async(id)=>{
        try {
          await axios.delete(`http://localhost:8080/books/${id}`)
          window.location.reload()
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <div>
        <h1>Nam book shop</h1>
        <div className="books">
            {books.length !==0 && books.map((book)=>(
                <div className="book" key={book.id}>
                    <img src={book.cover} alt="" />
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>${book.price}</span>
                    <button className='delete' onClick={()=> handleDelete(book.id)}>Delete</button>
                    <button className='update'>
                        <Link 
                            to={`/update/${book.id}`}
                            style={{color:'inherit',textDecoration:'none'}}>
                        Update
                        </Link>
                    </button>
                </div>
            ))}
        </div>

        <button className='addHome'>
            <Link 
                to='/add' 
                style={{color:'inherit',textDecoration:'none'}}
            >
                Add new book
            </Link>
        </button>
    </div>
  )
}

export default Books