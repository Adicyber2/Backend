import { useState,useEffect } from 'react'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([
   
  ])

  function fetchNotes(){
      axios.get("http://localhost:3000/api/notes")

     .then((res)=>{
      setNotes(res.data.notes)
      
      
  })
}
  useEffect(()=>{
    fetchNotes()
    
   },[])
 
//  post method

   function handleSubmit(e){
    e.preventDefault()

    const {title,description}= e.target.elements
    console.log(title.value,description.value);
    
    
    axios.post("http://localhost:3000/api/notes",{
       title:title.value,
       description:description.value
    })

    fetchNotes()
  
   
    
   }

// Delete method

  function deleteBtn(noteId){
  axios.delete("http://localhost:3000/api/notes/"+noteId)
    // console.log(noteId);
    
fetchNotes()
  
  
}

// Update notes method

function updateNotes(){
 console.log();
 
  
}

  return (
    <>
      
      <form className='note-create' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='title' />
        <input name='description' type="text" placeholder='description' />
        <button type='submit'>Creat Notes</button>
      </form>

      <div className="notes">
        {
          notes.map(note =>{
            return <div className="note">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button className='update' onClick={()=>updateNotes(note._id)}>Edit</button>
          <button className='delete' onClick={()=>deleteBtn(note._id)}>Delete</button>

        </div>
      

          })
        }
      </div> 
    </>

     
  )
}

export default App
