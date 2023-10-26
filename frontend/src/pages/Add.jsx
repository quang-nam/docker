import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Add = () => {
  const [book, setBook]= useState({
    title: '',
    desc: '',
    price: null,
    cover: ''
  })
  const handleChange=(e)=>{
    setBook((prev)=> ({
      ...prev, 
      [e.target.name]: e.target.value
    }))
    console.log(book)
  }
  const [err, setError]= useState(false)
  const navigate = useNavigate()
  const handleClick=async(e)=>{
    e.preventDefault()
    try {
      await axios.post('http://localhost:8080/books', book)
      navigate('/')
    } catch (error) {
      setError(true)
      
    }

  }
  return (
    <div className="form">
      <h1>Add new book</h1>
      <input 
        type="text" 
        name="title" 
        placeholder='Book title'
        onChange={handleChange} 
        />
      <textarea
        rows={5}
        placeholder='Book description'
        onChange={handleChange}
        name='desc'
        />
      <input
        type='number'
        placeholder='Book price'
        name='price'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Book cover'
        name='cover'
        onChange={handleChange} 
      />
      <button onClick={handleClick}>Add</button>
      {err && "Something went wrong !!!"}
      <Link to='/'>See all books</Link>
    </div>
  )
}

export default Add