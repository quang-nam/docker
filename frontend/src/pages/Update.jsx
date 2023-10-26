import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Update = () => {
  const [book, setBook]= useState({
    title: '',
    desc: '',
    price: null,
    cover: ''
  })
  const [err, setErr]= useState(false)
  const location = useLocation()
  const bookId=location.pathname.split('/')[2]
  const navigate= useNavigate()
  const handleChange=(e)=>{
    setBook(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
    console.log(book)
  }
  const handleClick=async(e)=>{
      e.preventDefault()
      try {
        await axios.put(`http://localhost:8080/books/${bookId}`,book);
        navigate('/')
       
      } catch (error) {
        console.log(err)
        setErr(true)
      }
  }
  
  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input 
      type="text" 
      name="title" 
      placeholder='Title'
      onChange={handleChange}
      />
      <textarea 
      name="desc" 
      rows={5}
      placeholder='Book Description'
      onChange={handleChange}
      />
      <input 
      type="number" 
      name="price"
      placeholder='Book Price'
      onChange={handleChange} 
      />
      <input 
      type="text" 
      name="cover" 
      onChange={handleChange}
      placeholder='Book Cover'
      />
      <button onClick={handleClick}>Update</button>
      {err && "Something went wrong !!!"}
      <Link to='/'>See all books</Link>
    </div>
  )
}

export default Update