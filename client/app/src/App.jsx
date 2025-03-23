import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([])
  const[title,setTitle]=useState("")
  const[newTitle,setNewTitle]=useState("")
  const [releasedYear,setReleasedYear]= useState(0)

  const fruits = ["Apple", "Mango", "Banana", "GFG"];

  useEffect(()=>{
    fetchBooks()
  },[]) 

  const fetchBooks= async()=>{
    try{ 
      const response = await fetch("http://127.0.0.1:8000/api/books/")
      const data = await response.json()
      setBooks(data)
      }
    catch(err){
      console.log(err)
    }}



    const addBook=async()=>{
      const bookdata ={
        title,
        released_year:releasedYear
      }
      try{
        const response= await fetch("http://127.0.0.1:8000/api/books/create/",{
          method:"POST",
          headers:{"Content-Type":"application/json",},
          body:JSON.stringify(bookdata),
        })
        const data= await response.json()
        console.log(data)
        setBooks((prev)=>[...prev,data])
      }catch(err){
        console.log(err)
      }
      
    }


    const updateTitle=async(pk, released_year)=>{
      const bookdata ={
        title:newTitle,
        released_year
      }
      try{
        const response= await fetch(`http://127.0.0.1:8000/api/books/${pk}`,{
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(bookdata),
        })
        const data= await response.json()
        
        setBooks((prev)=> prev.map((i)=>{
          if(i.id === pk){
            return data
          }else{
            return i
          }
        }))
      }catch(err){
        console.log(err)
      }
      
    }
    const deletebook=async(pk, released_year)=>{
      const bookdata ={
        title:newTitle,
        released_year
      }
      try{
        const response= await fetch(`http://127.0.0.1:8000/api/books/${pk}`,{
          method:"Delete",
        })

        setBooks((prev)=> prev.filter((i)=>{
          if(i.id !== pk){
            return i
          }
        })) 

        
      }catch(err){
        console.log(err)
      }
  }

  return (
    <>
     <h1>Book Website</h1>
     <input type="text" placeholder='Book Titel' onChange={(e)=>setTitle(e.target.value)}/>
     <input type="number" placeholder='Release Date' onChange={(e)=>setReleasedYear(e.target.value)} />
     <button onClick={addBook}>Add Book </button>
     {books.map((i)=>(
      <div className='conter'>
      <p>Title : {i.title}</p>
      <p>Released : {i.released_year} </p>
      <input type="text" placeholder='New Title' onChange={(e)=> setNewTitle(e.target.value)} />
      <button onClick={()=>updateTitle(i.id, i.released_year)}>Change Title</button>
      <button onClick={()=>deletebook(i.id)}>Delete</button>
     </div>
     ))}
    </>
  )
}

export default App
